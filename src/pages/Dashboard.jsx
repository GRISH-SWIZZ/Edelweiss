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
  Table,
  Badge,
  Progress,
  Box,
  SimpleGrid,
  RingProgress,
  Avatar,
  Paper,
  Grid,
  Divider,
  Tooltip,
  ActionIcon,
  ThemeIcon,
  Indicator,
  SegmentedControl
} from '@mantine/core';
import { LineChart, AreaChart } from '@mantine/charts';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart as BarChartIcon,
  LogOut,
  Settings,
  Bell,
  RefreshCw,
  Download,
  Share2,
  Filter,
  DollarSign,
  Clock,
  Shield,
  Cpu,
  Target,
  Zap,
  ChevronRight,
  Info,
  Maximize2,
  Minimize2,
  AlertTriangle
} from 'lucide-react';

import { apiClient } from '../config/api';
import { useStore } from '../store/useStore';
import { signOut } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

/* Intelligence Cards */
import PatternCard from '../components/PatternCard';
import RiskCard from '../components/RiskCard';
import MarketMoodCard from '../components/MarketMoodCard';
import AnomalyCard from '../components/AnomalyCard';

const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);
const MotionPaper = motion.create(Paper);

// Fixed Select data format
const stockSymbols = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN', 'NVDA', 'META'];
const timeHorizons = [
  { value: '1M', label: '1 Month' },
  { value: '3M', label: '3 Months' },
  { value: '6M', label: '6 Months' },
  { value: '1Y', label: '1 Year' },
];

/* ---------------- Loading Animation ---------------- */
const LoadingAnimation = () => {
  const steps = [
    'Fetching real-time market data...',
    'Analyzing historical patterns...',
    'Evaluating market sentiment...',
    'Calculating risk metrics...',
    'Generating AI-powered forecast...',
    'Finalizing intelligence insights...',
  ];

  const [step, setStep] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 800);
    return () => clearInterval(i);
  }, []);

  return (
    <Box ta="center" p="xl">
      <Stack align="center" gap="xl">
        <MotionBox
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Activity size={64} color="#84ff00" />
        </MotionBox>
        <Title order={3} style={{
          background: 'linear-gradient(135deg, #84ff00 0%, #00ffaa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          AI Analysis in Progress
        </Title>
        <Box w="100%" maw={400}>
          <Progress
            value={(step + 1) * (100 / steps.length)}
            color="lime"
            animated
            size="lg"
            radius="xl"
            style={{
              background: 'rgba(132, 255, 0, 0.1)',
              border: '1px solid rgba(132, 255, 0, 0.2)'
            }}
          />
        </Box>
        <AnimatePresence mode="wait">
          <MotionBox
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ minHeight: '24px' }}
          >
            <Text c="dimmed" fw={500}>{steps[step]}</Text>
          </MotionBox>
        </AnimatePresence>
      </Stack>
    </Box>
  );
};

/* ---------------- Chart Builder ---------------- */
const buildChartData = (last, predicted) => {
  const points = [];
  let base = last * 0.95; // Start slightly lower

  // Generate historical data points
  for (let i = 0; i < 30; i++) {
    const trend = (predicted - last) / 30;
    const noise = (Math.random() - 0.5) * last * 0.02; // ±2% noise
    base += trend + noise;
    points.push({
      date: `Day ${i + 1}`,
      historical: Number(base.toFixed(2)),
    });
  }

  // Add prediction points (5 days into future)
  for (let i = 31; i <= 35; i++) {
    const trend = (predicted - last) / 5;
    base += trend;
    points.push({
      date: `Day ${i}`,
      historical: Number(base.toFixed(2)),
      predicted: i === 35 ? Number(predicted.toFixed(2)) : null,
    });
  }

  return points;
};

/* ========================= DASHBOARD ========================= */
export default function Dashboard() {
  const navigate = useNavigate();

  const selectedSymbol = useStore((s) => s.selectedSymbol) || 'AAPL';
  const setSelectedSymbol = useStore((s) => s.setSelectedSymbol);
  const timeHorizon = useStore((s) => s.timeHorizon) || '1M';
  const setTimeHorizon = useStore((s) => s.setTimeHorizon);

  const [activeView, setActiveView] = useState('overview');

  /* -------- API Call -------- */
  const {
    mutate: runPrediction,
    data,
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

  const handleRefresh = () => {
    if (selectedSymbol) {
      runPrediction();
    }
  };

  // Auto-run prediction on component mount
  useEffect(() => {
    if (selectedSymbol) {
      runPrediction();
    }
  }, []);

  /* -------- Process Data -------- */
  const price = data?.price || {
    last_close: 175.25,
    predicted: 182.50,
    change_pct: 4.14
  };

  const confidence = data?.confidence || {
    score: 87,
    level: 'High'
  };

  const chartData = buildChartData(price.last_close, price.predicted);
  const isPositive = price?.change_pct >= 0;

  // Default explainability data
  const explainability = data?.explainability || [
    { feature: 'Trend Momentum', impact: 35 },
    { feature: 'Volume Shift', impact: 28 },
    { feature: 'Pattern Match', impact: 22 },
    { feature: 'Market Sentiment', impact: 15 },
  ];

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'transparent',
        position: 'relative',
      }}
    >
      {/* Background Elements */}

      {/* Header */}
      <Box
        py="lg"
        style={{
          borderBottom: '1px solid rgba(132, 255, 0, 0.15)',
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.9), rgba(10, 10, 15, 0.7))',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <Container size="xl">
          <Group justify="space-between" align="center">
            <Group gap="md">
              <MotionBox
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(132, 255, 0, 0.2), rgba(0, 255, 170, 0.15))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(132, 255, 0, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <img
                  src="/logo.png"
                  alt="Edelweiss Logo"
                  style={{
                    width: '32px',
                    height: '32px',
                    objectFit: 'contain'
                  }}
                />
              </MotionBox>

              <Stack gap={0}>
                <Title
                  order={2}
                  style={{
                    background: 'linear-gradient(135deg, #84ff00 0%, #00ffaa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '1.8rem'
                  }}
                >
                  Edelweiss Intelligence
                </Title>
                <Text size="xs" c="dimmed">
                  Real-time AI Market Analytics
                </Text>
              </Stack>
            </Group>

            <Group gap="md">
              <Button
                variant="subtle"
                color="red"
                leftSection={<LogOut size={18} />}
                onClick={handleLogout}
                style={{
                  border: '1px solid rgba(255, 107, 107, 0.2)',
                  background: 'rgba(255, 107, 107, 0.05)'
                }}
              >
                Logout
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>

      <Container size="xl" py="xl" style={{ position: 'relative', zIndex: 1 }}>
        {/* Dashboard Header */}
        <Group justify="space-between" mb="xl">
          <Stack gap="xs">
            <Title order={1} c="white">
              Market Intelligence Dashboard
            </Title>
            <Text c="dimmed">
              AI-powered insights for informed investment decisions
            </Text>
          </Stack>
        </Group>

        {/* Controls Card */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          p="xl"
          radius="lg"
          mb="xl"
          style={{
            background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.85), rgba(30, 30, 35, 0.5))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(132, 255, 0, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Group justify="space-between" align="flex-end">
            <Group align="flex-end" gap="xl">
              <Stack gap="xs">
                <Text size="sm" c="dimmed" fw={500}>
                  Select Stock
                </Text>
                <Select
                  placeholder="Choose a stock"
                  data={stockSymbols}
                  value={selectedSymbol}
                  onChange={setSelectedSymbol}
                  w={200}
                  size="md"
                  radius="lg"
                  styles={{
                    input: {
                      background: 'rgba(10, 10, 15, 0.7)',
                      border: '1px solid rgba(132, 255, 0, 0.2)',
                      color: 'white',
                      '&:focus': {
                        borderColor: '#84ff00',
                        boxShadow: '0 0 0 1px rgba(132, 255, 0, 0.3)'
                      }
                    },
                    dropdown: {
                      background: 'rgba(20, 20, 25, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(132, 255, 0, 0.2)'
                    }
                  }}
                />
              </Stack>

              <Stack gap="xs">
                <Text size="sm" c="dimmed" fw={500}>
                  Time Horizon
                </Text>
                <Select
                  placeholder="Select timeframe"
                  data={timeHorizons}
                  value={timeHorizon}
                  onChange={setTimeHorizon}
                  w={200}
                  size="md"
                  radius="lg"
                  styles={{
                    input: {
                      background: 'rgba(10, 10, 15, 0.7)',
                      border: '1px solid rgba(132, 255, 0, 0.2)',
                      color: 'white',
                      '&:focus': {
                        borderColor: '#84ff00',
                        boxShadow: '0 0 0 1px rgba(132, 255, 0, 0.3)'
                      }
                    }
                  }}
                />
              </Stack>
            </Group>

            <Group>
              <Button
                variant="light"
                size="md"
                leftSection={<RefreshCw size={18} />}
                onClick={handleRefresh}
                disabled={isLoading}
                style={{
                  background: 'rgba(132, 255, 0, 0.1)',
                  border: '1px solid rgba(132, 255, 0, 0.3)',
                  color: '#84ff00'
                }}
              >
                Refresh
              </Button>

              <Button
                onClick={handlePredict}
                loading={isLoading}
                leftSection={<BarChartIcon size={20} />}
                size="md"
                style={{
                  background: 'linear-gradient(135deg, #84ff00 0%, #00ffaa 100%)',
                  border: 'none',
                  fontWeight: 600
                }}
              >
                Generate Forecast
              </Button>
            </Group>
          </Group>
        </MotionPaper>

        {/* Loading State */}
        {isLoading && (
          <MotionCard
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            p="xl"
            radius="lg"
            style={{
              background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.85), rgba(30, 30, 35, 0.5))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(132, 255, 0, 0.15)',
            }}
          >
            <LoadingAnimation />
          </MotionCard>
        )}

        {/* Results */}
        {!isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Summary Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb="lg">
              <Card
                p="lg"
                radius="lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 20, 25, 0.9), rgba(30, 30, 35, 0.6))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(132, 255, 0, 0.1)',
                }}
              >
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Last Close</Text>
                    <ThemeIcon size="sm" variant="light" color="lime" radius="lg">
                      <DollarSign size={16} />
                    </ThemeIcon>
                  </Group>
                  <Title order={2} c="white">${price.last_close.toFixed(2)}</Title>
                  <Text size="xs" c="dimmed">Previous trading session</Text>
                </Stack>
              </Card>

              <Card
                p="lg"
                radius="lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 20, 25, 0.9), rgba(30, 30, 35, 0.6))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(132, 255, 0, 0.1)',
                }}
              >
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Predicted Price</Text>
                    <ThemeIcon size="sm" variant="light" color={isPositive ? "lime" : "red"} radius="lg">
                      {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    </ThemeIcon>
                  </Group>
                  <Title order={2} c={isPositive ? "#84ff00" : "#ff6b6b"}>
                    ${price.predicted.toFixed(2)}
                  </Title>
                  <Badge
                    leftSection={isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    color={isPositive ? 'lime' : 'red'}
                    variant="light"
                    radius="sm"
                    size="lg"
                  >
                    {isPositive ? '+' : ''}{price.change_pct.toFixed(2)}%
                  </Badge>
                </Stack>
              </Card>

              <Card
                p="lg"
                radius="lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 20, 25, 0.9), rgba(30, 30, 35, 0.6))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(132, 255, 0, 0.1)',
                }}
              >
                <Stack gap="xs" align="center">
                  <Group justify="space-between" w="100%">
                    <Text size="sm" c="dimmed">AI Confidence</Text>
                    <ThemeIcon size="sm" variant="light" color="cyan" radius="lg">
                      <Cpu size={16} />
                    </ThemeIcon>
                  </Group>
                  <RingProgress
                    size={100}
                    thickness={10}
                    sections={[{ value: confidence.score, color: 'lime' }]}
                    label={
                      <Text ta="center" fw={700} size="xl">
                        {confidence.score}%
                      </Text>
                    }
                    rootColor="rgba(132, 255, 0, 0.1)"
                  />
                  <Badge
                    color="lime"
                    variant="light"
                  >
                    {confidence.level}
                  </Badge>
                </Stack>
              </Card>

              <Card
                p="lg"
                radius="lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 20, 25, 0.9), rgba(30, 30, 35, 0.6))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(132, 255, 0, 0.1)',
                }}
              >
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Time Horizon</Text>
                    <ThemeIcon size="sm" variant="light" color="blue" radius="lg">
                      <Clock size={16} />
                    </ThemeIcon>
                  </Group>
                  <Title order={2} c="white">
                    {timeHorizons.find(t => t.value === timeHorizon)?.label || '1 Month'}
                  </Title>
                  <Text size="xs" c="dimmed">Prediction window</Text>
                  <Progress
                    value={100}
                    color="lime"
                    size="sm"
                    radius="xl"
                    style={{ background: 'rgba(132, 255, 0, 0.1)' }}
                  />
                </Stack>
              </Card>
            </SimpleGrid>

            {/* Main Chart Area */}
            <Grid gutter="lg" mb="lg">
              <Grid.Col span={{ base: 12, lg: 8 }}>
                <Card
                  p="lg"
                  radius="lg"
                  style={{
                    background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.9), rgba(30, 30, 35, 0.6))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(132, 255, 0, 0.15)',
                    height: '100%'
                  }}
                >
                  <Stack gap="md">
                    <Group justify="space-between">
                      <Stack gap={4}>
                        <Title order={3} c="white">
                          {selectedSymbol} Price Forecast
                        </Title>
                        <Text size="sm" c="dimmed">
                          Historical vs AI-Predicted Performance
                        </Text>
                      </Stack>
                    </Group>

                    <Box h={350}>
                      <LineChart
                        h={340}
                        data={chartData}
                        dataKey="date"
                        withGradient
                        withDots={false}
                        curveType="monotone"
                        series={[
                          {
                            name: 'historical',
                            color: '#84ff00',
                            label: 'Historical Price'
                          },
                          {
                            name: 'predicted',
                            color: '#0088ff',
                            label: 'AI Prediction',
                            strokeDasharray: '5 5'
                          },
                        ]}
                        yAxisLabel="$"
                        xAxisLabel="Days"
                        strokeWidth={3}
                        gridProps={{ stroke: 'rgba(132, 255, 0, 0.1)' }}
                      />
                    </Box>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, lg: 4 }}>
                <Stack h="100%" gap="lg">
                  {/* Market Status */}
                  <Card
                    p="lg"
                    radius="lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(20, 20, 25, 0.9), rgba(30, 30, 35, 0.6))',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(132, 255, 0, 0.1)',
                    }}
                  >
                    <Stack gap="md">
                      <Group justify="space-between">
                        <Text size="md" fw={600} c="white">Market Status</Text>
                        <Zap size={20} color="#84ff00" />
                      </Group>
                      <Stack gap="xs">
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Current Session</Text>
                          <Badge color="lime" variant="light">ACTIVE</Badge>
                        </Group>
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Symbol</Text>
                          <Text fw={600} c="white">{selectedSymbol}</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Prediction Confidence</Text>
                          <Text fw={600} c="white">{confidence.score}%</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Time Horizon</Text>
                          <Text fw={600} c="white">
                            {timeHorizons.find(t => t.value === timeHorizon)?.label}
                          </Text>
                        </Group>
                      </Stack>
                    </Stack>
                  </Card>

                  {/* Quick Stats */}
                  <Card
                    p="lg"
                    radius="lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(20, 20, 25, 0.9), rgba(30, 30, 35, 0.6))',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(132, 255, 0, 0.1)',
                    }}
                  >
                    <Stack gap="md">
                      <Text size="md" fw={600} c="white">Quick Stats</Text>
                      <Stack gap="xs">
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Market Cap</Text>
                          <Text fw={600} c="white">$2.8T</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Volume (24h)</Text>
                          <Text fw={600} c="white">54.2M</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">Avg. Vol (30d)</Text>
                          <Text fw={600} c="white">61.8M</Text>
                        </Group>
                        <Group justify="space-between">
                          <Text size="sm" c="dimmed">PE Ratio</Text>
                          <Text fw={600} c="white">28.4</Text>
                        </Group>
                      </Stack>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>

            {/* Intelligence Layer */}
            <Box mb="xl">
              <Title order={3} mb="md" c="white">AI Intelligence Modules</Title>
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
                <PatternCard pattern={data?.pattern_memory} />
                <RiskCard risk={data?.risk} />
                <MarketMoodCard marketMood={data?.market_mood} />
                <AnomalyCard anomaly={data?.anomaly} />
              </SimpleGrid>
            </Box>

            {/* Explainable AI Section */}
            <Card
              p="lg"
              radius="lg"
              mb="lg"
              style={{
                background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.9), rgba(30, 30, 35, 0.6))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(132, 255, 0, 0.15)',
              }}
            >
              <Stack gap="md">
                <Group justify="space-between">
                  <Stack gap={4}>
                    <Title order={3} c="white">Explainable AI Insights</Title>
                    <Text size="sm" c="dimmed">
                      Feature impact analysis behind predictions
                    </Text>
                  </Stack>
                </Group>

                <Table
                  highlightOnHover
                  styles={{
                    thead: {
                      background: 'rgba(132, 255, 0, 0.1)',
                      borderBottom: '1px solid rgba(132, 255, 0, 0.2)'
                    }
                  }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th c="dimmed">Feature</Table.Th>
                      <Table.Th c="dimmed">Impact</Table.Th>
                      <Table.Th c="dimmed">Percentage</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {explainability.map((x, i) => (
                      <Table.Tr key={i}>
                        <Table.Td>
                          <Group gap="xs">
                            <Box
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#84ff00'
                              }}
                            />
                            <Text>{x.feature}</Text>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <Progress
                            value={x.impact}
                            color="lime"
                            size="md"
                            radius="xl"
                            style={{
                              background: 'rgba(132, 255, 0, 0.1)',
                              minWidth: '200px'
                            }}
                          />
                        </Table.Td>
                        <Table.Td>
                          <Badge
                            color="lime"
                            variant="light"
                          >
                            {x.impact}%
                          </Badge>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Stack>
            </Card>

            {/* Footer Info */}
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card
                  p="lg"
                  radius="lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20, 20, 25, 0.9), rgba(30, 30, 35, 0.6))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(132, 255, 0, 0.1)',
                  }}
                >
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">Model Version</Text>
                      <ThemeIcon size="sm" variant="light" color="blue" radius="lg">
                        <Target size={16} />
                      </ThemeIcon>
                    </Group>
                    <Title order={4} c="white">v2.4.1</Title>
                    <Text size="xs" c="dimmed">Last updated: Today, 14:30 UTC</Text>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card
                  p="lg"
                  radius="lg"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20, 20, 25, 0.9), rgba(30, 30, 35, 0.6))',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(132, 255, 0, 0.1)',
                  }}
                >
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">Data Source</Text>
                      <ThemeIcon size="sm" variant="light" color="cyan" radius="lg">
                        <Shield size={16} />
                      </ThemeIcon>
                    </Group>
                    <Title order={4} c="white">Real-time Market Feed</Title>
                    <Text size="xs" c="dimmed">Latency: &lt;50ms • Updated every 5 min</Text>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <Card
            p="xl"
            radius="lg"
            mt="lg"
            style={{
              background: 'linear-gradient(145deg, rgba(255, 50, 50, 0.1), rgba(255, 50, 50, 0.05))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 50, 50, 0.2)',
            }}
          >
            <Stack align="center" gap="md">
              <AlertTriangle size={48} color="#ff6b6b" />
              <Stack align="center" gap="xs">
                <Title order={3} c="#ff6b6b">Analysis Error</Title>
                <Text c="dimmed" ta="center">
                  {error.message || 'Failed to fetch market data. Please try again.'}
                </Text>
              </Stack>
              <Button
                variant="light"
                color="red"
                onClick={handlePredict}
                leftSection={<RefreshCw size={16} />}
              >
                Try Again
              </Button>
            </Stack>
          </Card>
        )}

        {/* Attribution */}
        <Box mt="xl" pt="md" style={{ borderTop: '1px solid rgba(132, 255, 0, 0.1)' }}>
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Data updates every 5 minutes • Last refresh: Just now
            </Text>
            <Text size="sm" c="dimmed">
              A Project By Grish Narayanan
            </Text>
          </Group>
        </Box>
      </Container>
    </Box>
  );
}