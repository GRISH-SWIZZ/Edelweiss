import { useState } from 'react';
import { 
  Container, 
  Paper, 
  Title, 
  Text, 
  TextInput, 
  PasswordInput, 
  Button, 
  Divider,
  Stack,
  Group,
  Box
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { 
  signInWithGoogle, 
  signInWithFacebook, 
  signInWithEmail 
} from '../config/firebase';

const MotionPaper = motion.create(Paper);

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithFacebook();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await signInWithEmail(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #0a0a0f 0%, #14161b 100%)',
      }}
    >
      <Container size="xs">
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glassmorphic"
          p="xl"
          radius="md"
          style={{ border: '1px solid rgba(34, 211, 238, 0.2)' }}
        >
          <Stack gap="lg">
            {/* Header */}
            <Box ta="center">
              <Title
                order={1}
                style={{
                  background: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Edelweiss
              </Title>
              <Text c="dimmed" mt="xs">
                Sign in to access intelligence dashboard
              </Text>
            </Box>

            {/* Social Login Buttons */}
            <Stack gap="md">
              <Button
                size="md"
                variant="light"
                color="cyan"
                fullWidth
                onClick={handleGoogleLogin}
                loading={loading}
              >
                Continue with Google
              </Button>

              <Button
                size="md"
                variant="light"
                color="cyan"
                fullWidth
                onClick={handleFacebookLogin}
                loading={loading}
              >
                Continue with Facebook
              </Button>
            </Stack>

            <Divider label="OR" labelPosition="center" />

            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin}>
              <Stack gap="md">
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  leftSection={<Mail size={16} />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  leftSection={<Lock size={16} />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {error && (
                  <Text size="sm" c="red">
                    {error}
                  </Text>
                )}

                <Button
                  type="submit"
                  size="md"
                  fullWidth
                  rightSection={<LogIn size={18} />}
                  loading={loading}
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </form>

            {/* Footer */}
            <Group justify="center" gap="xs">
              <Text size="sm" c="dimmed">
                Don't have an account?
              </Text>
              <Text
                size="sm"
                c="cyan"
                style={{ cursor: 'pointer' }}
                fw={600}
              >
                Sign up
              </Text>
            </Group>
          </Stack>
        </MotionPaper>

        <Text size="xs" c="dimmed" ta="center" mt="xl">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </Text>
      </Container>
    </Box>
  );
}

export default LoginPage;
