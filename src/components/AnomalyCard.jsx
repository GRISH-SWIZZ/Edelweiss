import { Card, Text, Title, Badge, Stack } from '@mantine/core';

function AnomalyCard({ anomaly }) {
    if (!anomaly) return null;

    const colorMap = {
        NORMAL: 'green',
        WARNING: 'yellow',
        CRITICAL: 'red',
    };

    return (
        <Card className="glassmorphic" p="lg" radius="md">
            <Stack gap="xs">
                <Text size="sm" c="dimmed">
                    Anomaly & Black Swan Monitor
                </Text>

                <Title order={4}>{anomaly.status}</Title>

                <Badge color={colorMap[anomaly.status]}>
                    {anomaly.status}
                </Badge>

                <Text size="xs" c="dimmed">
                    Severity Score: {anomaly.severity}%
                </Text>
            </Stack>
        </Card>
    );
}

export default AnomalyCard;
