import { 
  Container, 
  Title, 
  Text, 
  Button, 
  Card, 
  SimpleGrid, 
  Badge, 
  Timeline,
  Stack,
  Group,
  Divider,
  Anchor,
  Box
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Smile, 
  Lightbulb, 
  ShieldCheck, 
  Clock, 
  Info, 
  Gauge, 
  Users,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const MotionCard = motion.create(Card);
const MotionBadge = motion.create(Badge);

const features = [
  {
    icon: Brain,
    title: 'Pattern Memory Engine™',
    description: 'Learns from historical patterns',
  },
  {
    icon: Smile,
    title: 'Market Mood Intelligence',
    description: 'Bullish/Bearish/Neutral signals',
  },
  {
    icon: Lightbulb,
    title: 'Explainable AI (X-AI)',
    description: 'Transparent decision making',
  },
  {
    icon: ShieldCheck,
    title: 'Risk-First Forecasting',
    description: 'Downside protection priority',
  },
  {
    icon: Clock,
    title: 'Time-Horizon Intelligence',
    description: 'Flexible prediction windows',
  },
  {
    icon: Info,
    title: 'Anomaly Detection',
    description: 'Black-swan event alerts',
  },
  {
    icon: Gauge,
    title: 'AI Confidence Index',
    description: 'Prediction certainty metrics',
  },
  {
    icon: Users,
    title: 'Human-in-the-Loop',
    description: 'Expert validation system',
  },
];

const techStack = [
  'React',
  'FastAPI',
  'TensorFlow',
  'Google Colab',
  'Firebase',
  'Mantine',
  'TanStack Query',
  'Recharts',
];

const developmentStages = [
  { title: 'Research & Planning', description: 'Market analysis and AI model design' },
  { title: 'Data Pipeline', description: 'Historical stock data collection' },
  { title: 'Model Training', description: 'Pattern recognition using TensorFlow' },
  { title: 'Backend Development', description: 'FastAPI REST endpoints' },
  { title: 'Frontend Development', description: 'React dashboard interface' },
  { title: 'Testing & Validation', description: 'Accuracy verification' },
  { title: 'Deployment', description: 'Production-ready system' },
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #14161b 100%)' }}>
      {/* Hero Section */}
      <Container size="xl" py={80}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Stack align="center" gap="xl">
            <Badge
              size="lg"
              variant="light"
              color="cyan"
              leftSection={<TrendingUp size={16} />}
            >
              AI Stock Intelligence Platform
            </Badge>

            <Title
              order={1}
              ta="center"
              style={{
                fontSize: '3.5rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #0891b2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Edelweiss
            </Title>

            <Text size="xl" c="dimmed" ta="center" maw={600}>
              Seeing Tomorrow in Today's Patterns
            </Text>

            <Text size="md" c="dimmed" ta="center" maw={700}>
              Advanced AI-powered stock prediction platform leveraging pattern recognition,
              sentiment analysis, and explainable machine learning for intelligent market insights.
            </Text>

            <Group gap="md" mt="md">
              <Button
                size="lg"
                radius="md"
                rightSection={<ArrowRight size={20} />}
                onClick={() => navigate('/login')}
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                }}
                className="neon-glow"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                color="cyan"
                radius="md"
                onClick={() => navigate('/dashboard')}
              >
                View Demo
              </Button>
            </Group>
          </Stack>
        </motion.div>
      </Container>

      {/* Features Section */}
      <Container size="xl" py={60}>
        <Title order={2} ta="center" mb="xl" c="white">
          Core Intelligence Features
        </Title>
        
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <MotionCard
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glassmorphic"
                p="xl"
                radius="md"
                style={{
                  border: '1px solid rgba(34, 211, 238, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(34, 211, 238, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(34, 211, 238, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Stack align="center" gap="md">
                  <Icon size={40} color="#22d3ee" />
                  <Text fw={600} ta="center" c="white">
                    {feature.title}
                  </Text>
                  <Text size="sm" c="dimmed" ta="center">
                    {feature.description}
                  </Text>
                </Stack>
              </MotionCard>
            );
          })}
        </SimpleGrid>
      </Container>

      {/* Tech Stack Section */}
      <Container size="xl" py={60}>
        <Title order={2} ta="center" mb="xl" c="white">
          Technology Stack
        </Title>
        
        <Group justify="center" gap="md">
          {techStack.map((tech, index) => (
            <MotionBadge
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              size="lg"
              variant="light"
              color="cyan"
              radius="md"
              p="md"
            >
              {tech}
            </MotionBadge>
          ))}
        </Group>
      </Container>

      {/* Development Timeline */}
      <Container size="md" py={60}>
        <Title order={2} ta="center" mb="xl" c="white">
          Development Journey
        </Title>
        
        <Timeline active={developmentStages.length} bulletSize={24} lineWidth={2} color="cyan">
          {developmentStages.map((stage, index) => (
            <Timeline.Item
              key={stage.title}
              title={
                <Text fw={600} c="white">
                  {stage.title}
                </Text>
              }
            >
              <Text size="sm" c="dimmed" mt={4}>
                {stage.description}
              </Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Container>

      {/* Footer */}
      <Container size="xl" py={40}>
        <Divider mb="xl" color="dark.4" />
        <Stack align="center" gap="md">
          <Text c="white" fw={700} size="lg">
            Edelweiss
          </Text>
          <Group gap="lg">
            <Anchor href="#" size="sm" c="dimmed">
              About
            </Anchor>
            <Anchor href="#" size="sm" c="dimmed">
              Features
            </Anchor>
            <Anchor href="#" size="sm" c="dimmed">
              Documentation
            </Anchor>
            <Anchor href="#" size="sm" c="dimmed">
              Contact
            </Anchor>
          </Group>
          <Text size="xs" c="dimmed">
            © 2026 Edelweiss AI. All rights reserved.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}

export default LandingPage;
