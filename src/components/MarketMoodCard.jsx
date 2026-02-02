import { Card, Text, Title, Badge, Progress, Stack } from '@mantine/core';

function MarketMoodCard({ marketMood }) {
    if (!marketMood) return null;

    const colorMap = {
        BULLISH: 'green',
        BEARISH: 'red',
        UNCERTAIN: 'yellow',
    };

    return (
        <Card className="glassmorphic" p="lg" radius="md">
            <Stack gap="xs">
                <Text size="sm" c="dimmed">Market Mood Intelligence</Text>

                <Title order={4}>{marketMood.state}</Title>

                <Badge color={colorMap[marketMood.state]}>
                    {marketMood.state}
                </Badge>

                <Progress
                    value={marketMood.confidence}
                    color="cyan"
                    size="lg"
                />

                <Text size="xs" c="dimmed">
                    Confidence: {marketMood.confidence}%
                </Text>
            </Stack>
        </Card>
    );
}

export default MarketMoodCard;
