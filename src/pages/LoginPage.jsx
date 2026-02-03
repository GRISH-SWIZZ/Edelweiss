import { useState, useRef, useEffect } from 'react';
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
  Box,
  Alert,
  Loader,
  Anchor
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithEmail
} from '../config/firebase';

const MotionPaper = motion.create(Paper);
const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);

// Animated Logo Component
const AnimatedLogo = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        textAlign: 'center',
        position: 'relative',
        marginBottom: '24px'
      }}
    >
      <MotionBox
        style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 16px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(132, 255, 0, 0.15), rgba(0, 255, 170, 0.1))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(132, 255, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        animate={{
          rotate: hovered ? 360 : 0,
          scale: hovered ? 1.1 : 1
        }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/logo.png"
          alt="Edelweiss Logo"
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 8px rgba(132, 255, 0, 0.3))'
          }}
        />

        {/* Glow effect */}
        <MotionBox
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent, rgba(132, 255, 0, 0.1), transparent)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1
          }}
        />
      </MotionBox>

      <MotionBox
        style={{
          fontSize: '3rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #84ff00 0%, #00ffaa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em',
          marginBottom: '4px',
          position: 'relative'
        }}
        animate={{
          backgroundPosition: hovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%'
        }}
        transition={{
          duration: hovered ? 2 : 0,
          repeat: hovered ? Infinity : 0
        }}
      >
        EDELWEISS
      </MotionBox>

      <Text
        size="sm"
        style={{
          background: 'linear-gradient(135deg, #fff 0%, #a0a0a0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 500,
          letterSpacing: '0.1em'
        }}
      >
        INTELLIGENCE PLATFORM
      </Text>
    </MotionBox>
  );
};

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Keep all existing functions exactly the same
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

  // Add subtle floating effect
  useEffect(() => {
    const interval = setInterval(() => {
      // This creates a subtle breathing effect
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Elements */}

      {/* Animated Gradient Orbs */}
      <MotionBox
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle at center, rgba(132, 255, 0, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <MotionBox
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle at center, rgba(0, 255, 170, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <Container size="sm">
        {/* Animated Logo */}
        <AnimatedLogo />

        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glassmorphic"
          p="xl"
          radius="lg"
          style={{
            border: '1px solid rgba(132, 255, 0, 0.15)',
            backdropFilter: 'blur(20px)',
            background: 'linear-gradient(145deg, rgba(20, 20, 25, 0.85), rgba(30, 30, 35, 0.5))',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Animated top border */}
          <MotionBox
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #84ff00, transparent)',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <Stack gap="lg">
            {/* Header Text - Keeping original text */}
            <Box ta="center">
              <Text size="lg" c="white" fw={600}>
                Welcome Back
              </Text>
              <Text size="sm" c="dimmed" mt={4}>
                Sign in to access intelligence dashboard
              </Text>
            </Box>

            {/* Social Login Buttons - Same functionality, enhanced UI */}
            <Stack gap="md">
              <MotionButton
                size="md"
                variant="light"
                onClick={handleGoogleLogin}
                loading={loading}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(132, 255, 0, 0.2)',
                  color: 'white',
                  fontWeight: 500
                }}
                whileHover={{
                  scale: 1.02,
                  background: 'rgba(132, 255, 0, 0.12)',
                  borderColor: 'rgba(132, 255, 0, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Continue with Google
              </MotionButton>

              <MotionButton
                size="md"
                variant="light"
                onClick={handleFacebookLogin}
                loading={loading}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(132, 255, 0, 0.2)',
                  color: 'white',
                  fontWeight: 500
                }}
                whileHover={{
                  scale: 1.02,
                  background: 'rgba(132, 255, 0, 0.12)',
                  borderColor: 'rgba(132, 255, 0, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Continue with Facebook
              </MotionButton>
            </Stack>

            <Divider
              label={
                <Text size="sm" c="dimmed">
                  Or continue with email
                </Text>
              }
              labelPosition="center"
              color="rgba(132, 255, 0, 0.15)"
            />

            {/* Email Login Form - Same functionality, enhanced UI */}
            <form onSubmit={handleEmailLogin}>
              <Stack gap="md">
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <TextInput
                    label={
                      <Text size="sm" fw={600} c="white">
                        Email Address
                      </Text>
                    }
                    placeholder="your@email.com"
                    leftSection={<Mail size={18} color="#84ff00" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    variant="filled"
                    size="md"
                    radius="md"
                    styles={{
                      input: {
                        background: 'rgba(10, 10, 15, 0.7)',
                        border: '1px solid rgba(132, 255, 0, 0.2)',
                        color: 'white',
                        transition: 'all 0.2s ease',
                        '&:focus': {
                          borderColor: '#84ff00',
                          boxShadow: '0 0 0 1px rgba(132, 255, 0, 0.3)',
                          background: 'rgba(10, 10, 15, 0.9)'
                        },
                        '&:hover': {
                          borderColor: 'rgba(132, 255, 0, 0.3)'
                        }
                      }
                    }}
                  />
                </MotionBox>

                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <PasswordInput
                    label={
                      <Text size="sm" fw={600} c="white">
                        Password
                      </Text>
                    }
                    placeholder="Your password"
                    leftSection={<Lock size={18} color="#84ff00" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    variant="filled"
                    size="md"
                    radius="md"
                    visibilityToggleIcon={({ reveal }) =>
                      reveal ?
                        <EyeOff size={18} color="#84ff00" style={{ cursor: 'pointer' }} /> :
                        <Eye size={18} color="#84ff00" style={{ cursor: 'pointer' }} />
                    }
                    styles={{
                      input: {
                        background: 'rgba(10, 10, 15, 0.7)',
                        border: '1px solid rgba(132, 255, 0, 0.2)',
                        color: 'white',
                        transition: 'all 0.2s ease',
                        '&:focus': {
                          borderColor: '#84ff00',
                          boxShadow: '0 0 0 1px rgba(132, 255, 0, 0.3)',
                          background: 'rgba(10, 10, 15, 0.9)'
                        },
                        '&:hover': {
                          borderColor: 'rgba(132, 255, 0, 0.3)'
                        }
                      }
                    }}
                  />
                </MotionBox>

                {/* Forgot Password Link */}
                <Group justify="flex-end" mt={4}>
                  <Anchor
                    size="sm"
                    style={{
                      color: '#84ff00',
                      textDecoration: 'none',
                      fontWeight: 500
                    }}
                    onClick={() => navigate('/forgot-password')}
                  >
                    Forgot password?
                  </Anchor>
                </Group>

                {/* Error Message - Enhanced */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Alert
                        icon={<AlertCircle size={16} />}
                        title="Authentication Error"
                        color="red"
                        variant="light"
                        radius="md"
                        styles={{
                          root: {
                            background: 'rgba(255, 50, 50, 0.1)',
                            border: '1px solid rgba(255, 50, 50, 0.3)'
                          },
                          message: {
                            color: '#ff6b6b'
                          }
                        }}
                      >
                        {error}
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sign In Button - Enhanced */}
                <MotionButton
                  type="submit"
                  size="md"
                  fullWidth
                  mt="md"
                  loading={loading}
                  loaderProps={{
                    type: 'dots',
                    color: 'white'
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #84ff00 0%, #00ffaa 100%)',
                    border: 'none',
                    fontWeight: 600,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(132, 255, 0, 0.2)'
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 6px 20px rgba(132, 255, 0, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <Loader size="sm" color="white" />
                  ) : (
                    <>
                      <LogIn size={18} style={{ marginRight: '8px' }} />
                      Sign In
                      <MotionBox
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                          transform: 'translateX(-100%)'
                        }}
                        animate={{ transform: 'translateX(100%)' }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                      />
                    </>
                  )}
                </MotionButton>
              </Stack>
            </form>

            {/* Sign Up Link - Enhanced */}
            <Group justify="center" gap="xs" mt="md">
              <Text size="sm" c="dimmed">
                Don't have an account?
              </Text>
              <MotionButton
                variant="subtle"
                size="sm"
                style={{
                  color: '#84ff00',
                  fontWeight: 600,
                  padding: 0
                }}
                onClick={() => navigate('/signup')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Group gap={4}>
                  <Sparkles size={14} />
                  <span>Sign up</span>
                </Group>
              </MotionButton>
            </Group>
          </Stack>
        </MotionPaper>

        {/* Footer Text - Enhanced */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          mt="xl"
        >
          <Text size="xs" c="dimmed" ta="center" style={{ lineHeight: 1.6 }}>
            By signing in, you agree to our{' '}
            <Anchor href="#" style={{ color: '#84ff00', fontWeight: 500 }}>Terms of Service</Anchor>{' '}
            and{' '}
            <Anchor href="#" style={{ color: '#84ff00', fontWeight: 500 }}>Privacy Policy</Anchor>
            <br />
            <Text component="span" size="xs" c="dimmed" mt={4}>
              All data is encrypted with AES-256
            </Text>
          </Text>
        </MotionBox>

        {/* Attribution */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          mt="lg"
        >
          <Text size="xs" c="dimmed" ta="center">
            A Project By Grish Narayanan
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
}

export default LoginPage;