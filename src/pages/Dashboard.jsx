import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Text,
  Button,
  Card,
  Select,
  Group,
  Stack,
  Tabs,
  Table,
  Badge,
  Progress,
  Box,
  SimpleGrid,
  RingProgress,
} from '@mantine/core';
import { LineChart } from '@mantine/charts';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart as BarChartIcon,
  LogOut,
} from 'lucide-react';
import { apiClient } from '../config/api';
import { useStore } from '../store/useStore';
import { signOut } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

/* ----- Intelligence Cards ----- */
import PatternCard from '../components/PatternCard';
import RiskCard from '../components/RiskCard';
import MarketMoodCard from '../components/MarketMoodCard';
import AnomalyCard from '../components/AnomalyCard';

/* ----------------------- Constants ----------------------- */
const timeHorizons = ['1D', '5D', '1M', '3M', '6M'];
const stockSymbols = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN', 'NVDA', 'META'];

/* ----------------------- Loading Animation ----------------------- */
const LoadingAnimation = () => {
  const stages = [
    'Fetching market data…',
    'Analyzing price dynamics…',
    'Matching historical patterns…',
    'Assessing risk & sentiment…',
    'Finalizing intelligence…',
  ];

  const [stage, setStage] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setStage((s) => (s + 1) % stages.length);
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <Box ta="center" p="xl">
      <Stack align="center" gap="xl">
        <Activity size={64} color="#22d3ee" />
        <Title order={3} c="cyan">
          Analysis in Progress
        </Title>
        <Progress value={(stage + 1) * 20} w="100%" color="cyan" animated />
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Text c="dimmed">{stages[stage]}</Text>
          </motion.div>
        </AnimatePresence>
      </Stack>
    </Box>
  );
};

/* ----------------------- Chart Builder -----------------------
   Visualization ONLY (not intelligence)
-------------------------------------------------------------- */
const buildChartData = (lastClose, predicted) => {
  const points = [];
  let base = lastClose * 0.9;

  for (let i = 0; i < 60; i++) {
    base += (Math.random() - 0.45) * 3;
    points.push({
      date: `Day ${i + 1}`,
      historical: Number(base.toFixed(2)),
    });
  }

  points.push({
    date: 'Prediction',
    historical: lastClose,
    predicted,
  });

  return points;
};

/* ========================== DASHBOARD ========================== */
function Dashboard() {
  const navigate = useNavigate();

  const selectedSymbol = useStore((s) => s.selectedSymbol);
  const setSelectedSymbol = useStore((s) => s.setSelectedSymbol);
  const timeHorizon = useStore((s) => s.timeHorizon);
  const setTimeHorizon = useStore((s) => s.setTimeHorizon);

  /* ----------------------- API Call ----------------------- */
  const {
    mutate: runPrediction,
    data: predictionData,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: () => apiClient.predict(selectedSymbol, 60),
  });

  const handlePredict = () => {
    if (!selectedSymbol) return;
    runPrediction();
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  /* ----------------------- Derived View Data ----------------------- */
  const chartData = predictionData
    ? buildChartData(
      predictionData.price.last_close,
      predictionData.price.predicted
    )
    : [];

  const priceChange = predictionData
    ? predictionData.price.change_pct
    : 0;

  const isPositive = priceChange >= 0;

  /* ========================== RENDER ========================== */
  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0a0f 0%, #14161b 100%)',
      }}
    >
      {/* ---------------- Header ---------------- */}
      <Box py="md" style={{ borderBottom: '1px solid rgba(34,211,238,0.2)' }}>
        <Container size="xl">
          <Group justify="space-between">
            <Title
              order={2}
              style={{
                background:
                  'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Edelweiss Intelligence
            </Title>
            <Button
              variant="subtle"
              color="red"
              leftSection={<LogOut size={18} />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Group>
        </Container>
      </Box>

      <Container size="xl" py="xl">
        {/* ---------------- Controls ---------------- */}
        <Card p="lg" radius="md" mb="xl" className="glassmorphic">
          <Group justify="space-between">
            <Group gap="md">
              <Select
                label="Stock Symbol"
                data={stockSymbols}
                value={selectedSymbol}
                onChange={(v) => v && setSelectedSymbol(v)}
                w={150}
              />
              <Select
                label="Time Horizon"
                data={timeHorizons}
                value={timeHorizon}
                onChange={(v) => v && setTimeHorizon(v)}
                w={150}
              />
            </Group>
            <Button
              onClick={handlePredict}
              loading={isLoading}
              leftSection={<BarChartIcon size={18} />}
              style={{
                background:
                  'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              }}
            >
              Predict
            </Button>
          </Group>
        </Card>

        {/* ---------------- Loading ---------------- */}
        {isLoading && (
          <Card p="xl" radius="md" className="glassmorphic">
            <LoadingAnimation />
          </Card>
        )}

        {/* ---------------- Result ---------------- */}
        {!isLoading && predictionData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Chart + Core Stats */}
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mb="xl">
              <Box style={{ gridColumn: 'span 2' }}>
                <Card p="lg" radius="md" className="glassmorphic">
                  <Text size="sm" c="dimmed">
                    View: {timeHorizon}
                  </Text>
                  <Title order={4} mb="md">
                    Price Forecast
                  </Title>
                  <LineChart
                    h={400}
                    data={chartData}
                    dataKey="date"
                    series={[
                      { name: 'historical', color: '#22d3ee' },
                      {
                        name: 'predicted',
                        color: '#f59e0b',
                        strokeDasharray: '5 5',
                      },
                    ]}
                    withDots={false}
                    withLegend
                    curveType="monotone"
                  />
                </Card>
              </Box>

              <Stack>
                <Card p="lg" className="glassmorphic">
                  <Text size="sm" c="dimmed">Last Close</Text>
                  <Title order={2}>
                    ${predictionData.price.last_close.toFixed(2)}
                  </Title>
                </Card>

                <Card p="lg" className="glassmorphic">
                  <Text size="sm" c="dimmed">Predicted Price</Text>
                  <Title order={2} c={isPositive ? 'green' : 'red'}>
                    ${predictionData.price.predicted.toFixed(2)}
                  </Title>
                  <Group>
                    {isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                    <Text fw={600}>{priceChange.toFixed(2)}%</Text>
                  </Group>
                </Card>

                <Card p="lg" className="glassmorphic">
                  <Text size="sm" c="dimmed">AI Confidence</Text>
                  <RingProgress
                    size={120}
                    thickness={12}
                    sections={[
                      { value: predictionData.confidence.score, color: 'cyan' },
                    ]}
                    label={
                      <Text ta="center" fw={700}>
                        {predictionData.confidence.score}%
                      </Text>
                    }
                  />
                </Card>
              </Stack>
            </SimpleGrid>

            {/* Intelligence Layer */}
            <SimpleGrid cols={{ base: 1, md: 4 }} spacing="lg" mb="xl">
              <PatternCard pattern={predictionData.pattern_memory} />
              <RiskCard risk={predictionData.risk} />
              <MarketMoodCard marketMood={predictionData.market_mood} />
              <AnomalyCard anomaly={predictionData.anomaly} />
            </SimpleGrid>

            {/* Model Info */}
            <Card p="lg" radius="md" className="glassmorphic">
              <Tabs defaultValue="metrics" color="cyan">
                <Tabs.List>
                  <Tabs.Tab value="metrics">Model</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="metrics" pt="md">
                  <Table>
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Td>Model Version</Table.Td>
                        <Table.Td>{predictionData.model.version}</Table.Td>
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </Tabs.Panel>
              </Tabs>
            </Card>
          </motion.div>
        )}

        {/* ---------------- Empty ---------------- */}
        {!isLoading && !predictionData && (
          <Card p="xl" radius="md" className="glassmorphic">
            <Stack align="center">
              <BarChartIcon size={64} color="#22d3ee" />
              <Title order={3}>Select a stock and click Predict</Title>
              <Text c="dimmed">
                Generate AI-powered market intelligence
              </Text>
            </Stack>
          </Card>
        )}

        {error && (
          <Text c="red" ta="center" mt="md">
            {error.message}
          </Text>
        )}
      </Container>
    </Box>
  );
}

export default Dashboard;
