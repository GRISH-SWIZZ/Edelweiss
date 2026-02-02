import { Card, Text, Title, Progress, Stack } from '@mantine/core';

function PatternCard({ pattern }) {
    if (!pattern) return null;

    return (
        <Card className="glassmorphic" p="lg" radius="md">
            <Stack gap="xs">
                <Text size="sm" c="dimmed">Pattern Memory Engine™</Text>

                <Title order={4} c="white">
                    {pattern.pattern_name}
                </Title>

                <Text size="sm" c="dimmed">Similarity</Text>

                <Progress value={pattern.similarity} color="cyan" size="lg" />

                <Text size="xs" c="dimmed">
                    Last seen: {pattern.last_seen}
                </Text>
            </Stack>
        </Card>
    );
}

export default PatternCard;
