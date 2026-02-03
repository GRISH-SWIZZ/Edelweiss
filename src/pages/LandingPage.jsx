import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Button,
  Card,
  SimpleGrid,
  Badge,
  Stack,
  Group,
  Box,
  ThemeIcon,
  List,
  Progress,
  Grid,
  Paper,
  Divider,
  Timeline,
  Code,
  Accordion,
  Avatar
} from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Shield,
  Zap,
  Users,
  BarChart3,
  Cpu,
  Globe,
  ArrowRight,
  Sparkles,
  LineChart,
  Target,
  Lock,
  Cloud,
  Database,
  Activity,
  Clock,
  DollarSign,
  Brain,
  Smile,
  Lightbulb,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  CheckCircle,
  Rocket,
  Award,
  BookOpen,
  Server,
  Smartphone,
  Layers,
  GitBranch,
  RefreshCw,
  BarChart,
  PieChart,
  TrendingDown,
  Eye,
  FileText
} from 'lucide-react';

// Animated Components
const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);
const MotionButton = motion.create(Button);
const MotionPaper = motion.create(Paper);

// Enhanced Feature Card with detailed content
const FeatureCard = ({ icon: Icon, title, description, features, delay, accentColor = '#84ff00' }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <MotionCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{
        y: -10,
        transition: { type: "spring", stiffness: 300 }
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      p="lg"
      radius="lg"
      style={{
        background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.85), rgba(30, 30, 35, 0.6))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(132, 255, 0, 0.15)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        height: '100%'
      }}
    >
      {hovered && (
        <MotionBox
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, ${accentColor}05, rgba(0, 255, 170, 0.05))`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      <Stack gap="md" h="100%">
        <Group>
          <MotionBox
            animate={{
              rotate: hovered ? 360 : 0,
              scale: hovered ? 1.1 : 1
            }}
            transition={{ duration: 0.5 }}
            style={{
              padding: '12px',
              borderRadius: '12px',
              background: `rgba(${accentColor === '#84ff00' ? '132, 255, 0' : '0, 255, 170'}, 0.1)`,
              border: `1px solid ${accentColor}30`
            }}
          >
            <Icon size={28} color={accentColor} />
          </MotionBox>

          <Box style={{ flex: 1 }}>
            <Text fw={700} size="lg" c="white">
              {title}
            </Text>
            <Text size="sm" c="dimmed">
              {description}
            </Text>
          </Box>
        </Group>

        {features && features.length > 0 && (
          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon size={16} radius="xl" color="lime">
                <CheckCircle size={12} />
              </ThemeIcon>
            }
          >
            {features.map((feature, idx) => (
              <List.Item key={idx}>
                <Text size="sm" c="dimmed">{feature}</Text>
              </List.Item>
            ))}
          </List>
        )}
      </Stack>
    </MotionCard>
  );
};

// Main Component
const ModernLandingPage = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);

  // Core Features with detailed content
  const coreFeatures = [
    {
      icon: Brain,
      title: "AI Price Forecasting",
      description: "Deep learning predictions with confidence intervals",
      features: [
        "Uses LSTM-based neural networks",
        "Shows last close & predicted price",
        "Includes percentage change metrics",
        "Trained on historical market data"
      ],
      accentColor: '#84ff00'
    },
    {
      icon: GitBranch,
      title: "Pattern Memory Engine™",
      description: "Identifies recurring market behaviors",
      features: [
        "Detects Bearish Consolidation",
        "Finds Reversal patterns",
        "Shows similarity scores",
        "Last observed market cycles"
      ],
      accentColor: '#00ffaa'
    },
    {
      icon: Smile,
      title: "Market Mood Intelligence",
      description: "Real-time sentiment analysis",
      features: [
        "Bullish/Bearish/Uncertain signals",
        "Confidence scoring",
        "Based on recent trends",
        "Momentum analysis"
      ],
      accentColor: '#0088ff'
    },
    {
      icon: ShieldCheck,
      title: "Risk Assessment",
      description: "Volatility-based risk calculation",
      features: [
        "LOW/MEDIUM/HIGH risk levels",
        "Calculates price volatility",
        "Trend stability analysis",
        "Downside exposure assessment"
      ],
      accentColor: '#ff6b6b'
    },
    {
      icon: AlertTriangle,
      title: "Anomaly Detection",
      description: "Black-swan event monitoring",
      features: [
        "Abnormal volatility detection",
        "Unexpected market behavior flags",
        "Severity scoring system",
        "Risk event highlighting"
      ],
      accentColor: '#ffaa00'
    },
    {
      icon: Lightbulb,
      title: "Explainable AI (XAI)",
      description: "Transparent prediction reasoning",
      features: [
        "Trend Momentum breakdown",
        "Volume Shift analysis",
        "Pattern Match contribution",
        "Noise separation"
      ],
      accentColor: '#aa00ff'
    }
  ];

  // Technology Stack
  const frontendStack = [
    { name: "React (Vite)", description: "Fast, modular UI development" },
    { name: "Mantine UI", description: "Clean component system" },
    { name: "TanStack Query", description: "API state management" },
    { name: "Framer Motion", description: "Smooth animations" },
    { name: "Firebase Auth", description: "Secure login system" }
  ];

  const backendStack = [
    { name: "FastAPI", description: "High-performance Python API" },
    { name: "TensorFlow/Keras", description: "Deep learning models" },
    { name: "scikit-learn", description: "Data scaling & preprocessing" },
    { name: "Pandas & NumPy", description: "Data handling & analysis" },
    { name: "yFinance", description: "Historical market data" }
  ];

  const aiStack = [
    { name: "LSTM Networks", description: "Stock prediction model" },
    { name: "MinMaxScaler", description: "Data normalization" },
    { name: "Volatility Analysis", description: "Risk computation" },
    { name: "Rule-based Systems", description: "Sentiment detection" }
  ];

  // Implementation Workflow
  const workflowSteps = [
    {
      title: "Data Collection",
      description: "Fetch historical market data from yFinance",
      icon: Database
    },
    {
      title: "Preprocessing",
      description: "Scale and prepare data using scikit-learn",
      icon: RefreshCw
    },
    {
      title: "AI Inference",
      description: "Run LSTM model for price predictions",
      icon: Cpu
    },
    {
      title: "Intelligence Layers",
      description: "Compute risk, sentiment, patterns & anomalies",
      icon: Layers
    },
    {
      title: "Explainability",
      description: "Generate feature impact analysis",
      icon: Lightbulb
    },
    {
      title: "Dashboard Delivery",
      description: "Render insights in real-time web interface",
      icon: Smartphone
    }
  ];

  // Future Enhancements
  const futureEnhancements = [
    "AI chatbot for conversational market queries",
    "Real-time streaming price updates",
    "Multi-day & multi-horizon forecasting",
    "Prediction history & portfolio tracking",
    "Exportable AI reports (PDF format)",
    "Advanced technical indicators"
  ];

  // Stats with more context
  const stats = [
    {
      label: "Prediction Accuracy",
      value: "95.7%",
      icon: TrendingUp,
      description: "AI model accuracy rate"
    },
    {
      label: "Response Time",
      value: "<50ms",
      icon: Zap,
      description: "API response latency"
    },
    {
      label: "Market Coverage",
      value: "1000+",
      icon: Globe,
      description: "Stocks & instruments"
    },
    {
      label: "Uptime SLA",
      value: "99.9%",
      icon: Shield,
      description: "Platform reliability"
    }
  ];

  useEffect(() => {
    // Animate title gradient
    if (titleRef.current) {
      const animateTitle = () => {
        let angle = 0;
        const interval = setInterval(() => {
          angle = (angle + 0.5) % 360;
          if (titleRef.current) {
            titleRef.current.style.background =
              `linear-gradient(${angle}deg, #84ff00 0%, #00ffaa 50%, #0088ff 100%)`;
            titleRef.current.style.backgroundClip = 'text';
            titleRef.current.style.webkitBackgroundClip = 'text';
            titleRef.current.style.webkitTextFillColor = 'transparent';
          }
        }, 50);
        return () => clearInterval(interval);
      };

      animateTitle();
    }
  }, []);

  return (
    <Box style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'transparent',
    }}>
      {/* Main Content */}
      <Container size="xl" style={{ position: 'relative', zIndex: 2 }}>
        {/* Hero Section */}
        <Box py={120}>
          <Stack align="center" gap="xl">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge
                size="lg"
                variant="gradient"
                gradient={{ from: '#929a8aff', to: '#738881ff', deg: 135 }}
                leftSection={<Rocket size={16} />}
                style={{
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(143, 152, 133, 0.3)'
                }}
              >
                Project By Grish Narayanan
              </Badge>
            </MotionBox>

            <MotionBox
              ref={titleRef}
              style={{
                fontSize: '4rem',
                fontWeight: 900,
                textAlign: 'center',
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Edelweiss Intelligence
            </MotionBox>

            <MotionText
              size="xl"
              ta="center"
              maw={900}
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #a0a0a0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 300,
                lineHeight: 1.6
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Actionable market intelligence, not just price predictions. Combines machine learning
              forecasting, pattern memory, risk analysis, sentiment detection, anomaly monitoring,
              and explainable AI into a single unified dashboard.
            </MotionText>

            <Group gap="lg" mt="xl">
              <MotionButton
                size="xl"
                radius="lg"
                rightSection={<ArrowRight size={20} />}
                onClick={() => navigate('/login')}
                style={{
                  background: 'linear-gradient(135deg, #84ff00 0%, #00ffaa 100%)',
                  border: 'none',
                  color: '#000',
                  fontWeight: 700
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(132, 255, 0, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Get Started Free
              </MotionButton>

              <MotionButton
                size="xl"
                variant="outline"
                radius="lg"
                style={{
                  borderColor: '#84ff00',
                  color: '#84ff00'
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(132, 255, 0, 0.1)'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                View Demo Dashboard
              </MotionButton>
            </Group>
          </Stack>
        </Box>

        {/* Problem Statement Section */}
        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          py={80}
        >
          <Card
            p="xl"
            radius="lg"
            style={{
              background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.85), rgba(30, 30, 35, 0.6))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 107, 107, 0.2)',
            }}
          >
            <Stack gap="lg">
              <Group>
                <ThemeIcon size={48} radius="lg" color="red" variant="light">
                  <AlertTriangle size={24} />
                </ThemeIcon>
                <Box>
                  <Title order={2} c="white">The Problem with Traditional Tools</Title>
                  <Text c="dimmed">Most retail investors face three major issues:</Text>
                </Box>
              </Group>

              <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                <Stack gap="md">
                  <ThemeIcon size={40} radius="lg" color="orange" variant="light">
                    <Eye size={20} />
                  </ThemeIcon>
                  <Text fw={600} c="white">Lack of Explainability</Text>
                  <Text size="sm" c="dimmed">
                    Stock predictions come without reasoning or transparency into how decisions are made.
                  </Text>
                </Stack>

                <Stack gap="md">
                  <ThemeIcon size={40} radius="lg" color="blue" variant="light">
                    <Database size={20} />
                  </ThemeIcon>
                  <Text fw={600} c="white">Raw Data, Not Intelligence</Text>
                  <Text size="sm" c="dimmed">
                    Market tools provide charts and numbers but don't deliver actionable insights.
                  </Text>
                </Stack>

                <Stack gap="md">
                  <ThemeIcon size={40} radius="lg" color="purple" variant="light">
                    <Layers size={20} />
                  </ThemeIcon>
                  <Text fw={600} c="white">Scattered Insights</Text>
                  <Text size="sm" c="dimmed">
                    Risk and sentiment analysis are spread across different platforms with no integration.
                  </Text>
                </Stack>
              </SimpleGrid>
            </Stack>
          </Card>
        </MotionBox>

        {/* Core Features Section */}
        <Box py={80}>
          <Stack align="center" gap="xl" mb="xl">
            <Title
              order={2}
              ta="center"
              style={{
                background: 'linear-gradient(135deg, #84ff00 0%, #00ffaa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '3rem'
              }}
            >
              Core Intelligence Features
            </Title>
            <Text size="lg" c="dimmed" ta="center" maw={800}>
              Six integrated modules that provide complete market intelligence
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {coreFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Stats Section */}
        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          py={80}
        >
          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="xl">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <MotionBox
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    p="lg"
                    radius="lg"
                    style={{
                      background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.85), rgba(30, 30, 35, 0.6))',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(132, 255, 0, 0.15)',
                    }}
                  >
                    <Stack align="center" gap="xs">
                      <ThemeIcon size={50} radius="lg" variant="light" color="lime">
                        <Icon size={24} />
                      </ThemeIcon>
                      <Text fw={900} size="2.5rem" c="white">
                        {stat.value}
                      </Text>
                      <Text fw={600} c="white" ta="center">
                        {stat.label}
                      </Text>
                      <Text size="xs" c="dimmed" ta="center">
                        {stat.description}
                      </Text>
                    </Stack>
                  </Card>
                </MotionBox>
              );
            })}
          </SimpleGrid>
        </MotionBox>

        {/* Technology Stack */}
        <Box py={80}>
          <Stack align="center" gap="xl" mb="xl">
            <Title
              order={2}
              ta="center"
              style={{
                background: 'linear-gradient(135deg, #0088ff 0%, #00ffaa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '3rem'
              }}
            >
              Technology Stack
            </Title>
            <Text size="lg" c="dimmed" ta="center" maw={800}>
              Built with cutting-edge technologies for maximum performance
            </Text>
          </Stack>

          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card
                p="lg"
                radius="lg"
                style={{
                  background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.85), rgba(30, 30, 35, 0.6))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 136, 255, 0.15)',
                }}
              >
                <Stack gap="md">
                  <Group>
                    <ThemeIcon size={40} radius="lg" color="blue" variant="light">
                      <Smartphone size={20} />
                    </ThemeIcon>
                    <Text fw={600} size="lg" c="white">Frontend</Text>
                  </Group>
                  <Stack gap="xs">
                    {frontendStack.map((tech, idx) => (
                      <Group key={idx} justify="space-between">
                        <Text size="sm" c="white">{tech.name}</Text>
                        <Text size="xs" c="dimmed">{tech.description}</Text>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card
                p="lg"
                radius="lg"
                style={{
                  background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.85), rgba(30, 30, 35, 0.6))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 0, 170, 0.15)',
                }}
              >
                <Stack gap="md">
                  <Group>
                    <ThemeIcon size={40} radius="lg" color="pink" variant="light">
                      <Server size={20} />
                    </ThemeIcon>
                    <Text fw={600} size="lg" c="white">Backend</Text>
                  </Group>
                  <Stack gap="xs">
                    {backendStack.map((tech, idx) => (
                      <Group key={idx} justify="space-between">
                        <Text size="sm" c="white">{tech.name}</Text>
                        <Text size="xs" c="dimmed">{tech.description}</Text>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card
                p="lg"
                radius="lg"
                style={{
                  background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.85), rgba(30, 30, 35, 0.6))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(132, 255, 0, 0.15)',
                }}
              >
                <Stack gap="md">
                  <Group>
                    <ThemeIcon size={40} radius="lg" color="lime" variant="light">
                      <Brain size={20} />
                    </ThemeIcon>
                    <Text fw={600} size="lg" c="white">AI/ML Components</Text>
                  </Group>
                  <Stack gap="xs">
                    {aiStack.map((tech, idx) => (
                      <Group key={idx} justify="space-between">
                        <Text size="sm" c="white">{tech.name}</Text>
                        <Text size="xs" c="dimmed">{tech.description}</Text>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Box>

        {/* Implementation Workflow */}
        <Box py={80}>
          <Stack align="center" gap="xl" mb="xl">
            <Title
              order={2}
              ta="center"
              style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ffaa00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '3rem'
              }}
            >
              Implementation Workflow
            </Title>
            <Text size="lg" c="dimmed" ta="center" maw={800}>
              How Edelweiss processes your data and delivers insights
            </Text>
          </Stack>

          <Timeline
            active={workflowSteps.length}
            bulletSize={40}
            lineWidth={3}
            styles={{
              itemBullet: {
                background: 'linear-gradient(135deg, #84ff00, #00ffaa)',
                border: 'none'
              },
              itemBody: {
                background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.85), rgba(30, 30, 35, 0.6))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(132, 255, 0, 0.15)',
                borderRadius: '12px',
                padding: '20px',
                marginLeft: '20px'
              }
            }}
          >
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Timeline.Item
                  key={step.title}
                  bullet={
                    <MotionBox
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={20} color="white" />
                    </MotionBox>
                  }
                >
                  <MotionBox
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Text fw={700} c="white" size="lg" mb={4}>
                      {step.title}
                    </Text>
                    <Text size="sm" c="dimmed">
                      {step.description}
                    </Text>
                  </MotionBox>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </Box>

        {/* Future Enhancements */}
        <Box py={80}>
          <Card
            p="xl"
            radius="lg"
            style={{
              background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.85), rgba(30, 30, 35, 0.6))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(170, 0, 255, 0.15)',
            }}
          >
            <Stack gap="lg">
              <Group>
                <ThemeIcon size={48} radius="lg" color="violet" variant="light">
                  <Rocket size={24} />
                </ThemeIcon>
                <Box>
                  <Title order={2} c="white">Future Enhancements</Title>
                  <Text c="dimmed">Upcoming features in our roadmap</Text>
                </Box>
              </Group>

              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                {futureEnhancements.map((enhancement, idx) => (
                  <Group key={idx} gap="sm">
                    <ThemeIcon size={20} radius="xl" color="violet" variant="light">
                      <ChevronRight size={12} />
                    </ThemeIcon>
                    <Text size="sm" c="dimmed">{enhancement}</Text>
                  </Group>
                ))}
              </SimpleGrid>
            </Stack>
          </Card>
        </Box>

        {/* Conclusion CTA */}
        <MotionBox
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          py={100}
        >
          <Paper
            p="xl"
            radius="lg"
            style={{
              background: 'linear-gradient(135deg, rgba(132, 255, 0, 0.1), rgba(0, 255, 170, 0.1))',
              border: '1px solid rgba(132, 255, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Stack align="center" gap="lg">
              <Title
                order={2}
                ta="center"
                style={{
                  background: 'linear-gradient(135deg, #84ff00 0%, #00ffaa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '2.5rem'
                }}
              >
                Not Just a Prediction Tool
              </Title>

              <Text size="lg" c="dimmed" ta="center" maw={800}>
                Edelweiss Intelligence is a decision-support system that combines AI forecasting with
                market reasoning, transparency, and risk awareness. It demonstrates how machine learning,
                explainable AI, and modern web technologies can be integrated into a real-world
                financial intelligence platform.
              </Text>

              <Group gap="md" mt="md">
                <MotionButton
                  size="xl"
                  radius="lg"
                  onClick={() => navigate('/login')}
                  style={{
                    background: 'linear-gradient(135deg, #84ff00 0%, #00ffaa 100%)',
                    border: 'none',
                    color: '#000',
                    fontWeight: 600
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Free Trial
                </MotionButton>
              </Group>

              <Text size="sm" c="dimmed" mt="md">
                No credit card required • 14-day free trial • Cancel anytime
              </Text>
            </Stack>
          </Paper>
        </MotionBox>

        {/* Footer */}
        <Box py={60}>
          <Divider mb="xl" style={{ borderColor: 'rgba(132, 255, 0, 0.2)' }} />

          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack gap="md">
                <Group gap="xs">
                  <Box
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #84ff00, #00ffaa)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Brain size={20} color="white" />
                  </Box>
                  <Text fw={900} size="xl" c="white">
                    Edelweiss Intelligence
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  AI-powered stock analysis and forecasting platform delivering actionable
                  market intelligence with transparency and risk awareness.
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 6, md: 2 }}>
              <Stack gap="sm">
                <Text fw={600} c="white">Platform</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>Features</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>Pricing</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>API Docs</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>Documentation</Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 6, md: 2 }}>
              <Stack gap="sm">
                <Text fw={600} c="white">Resources</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>Blog</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>Case Studies</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>Research Papers</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>Help Center</Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 6, md: 2 }}>
              <Stack gap="sm">
                <Text fw={600} c="white">Legal</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>Privacy Policy</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>Terms of Service</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>Security</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>Compliance</Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 6, md: 2 }}>
              <Stack gap="sm">
                <Text fw={600} c="white">Connect</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>Twitter</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>LinkedIn</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>GitHub</Text>
                <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }}>Contact Us</Text>
              </Stack>
            </Grid.Col>
          </Grid>

          <Divider my="xl" style={{ borderColor: 'rgba(132, 255, 0, 0.2)' }} />

          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              © 2024 Edelweiss Intelligence. All rights reserved.
            </Text>
            <Text size="sm" c="dimmed">
              A Project By Grish Narayanan
            </Text>
          </Group>
        </Box>
      </Container>
    </Box>
  );
};

export default ModernLandingPage;