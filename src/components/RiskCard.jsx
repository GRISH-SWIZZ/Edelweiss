import { Card, Text, Title, Badge, Progress, Stack, Group } from '@mantine/core';

function RiskCard({ risk }) {
    if (!risk) return null;

    const colorMap = {
        LOW: 'green',
        MEDIUM: 'yellow',
        HIGH: 'red',
    };

    return (
        <Card className="glassmorphic" p="lg" radius="md">
            <Stack gap="xs">
                <Text size="sm" c="dimmed">Risk Assessment</Text>

                <Group>
                    <Title order={4}>Risk Level</Title>
                    <Badge color={colorMap[risk.level]}>
                        {risk.level}
                    </Badge>
                </Group>

                <Progress
                    value={risk.volatility * 100}
                    color={colorMap[risk.level]}
                    size="lg"
                />

                <Text size="xs" c="dimmed">
                    Volatility: {(risk.volatility * 100).toFixed(1)}%
                </Text>
            </Stack>
        </Card>
    );
}

export default RiskCard;
