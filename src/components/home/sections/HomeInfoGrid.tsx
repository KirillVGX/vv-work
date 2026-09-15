import { Container, Section } from '@/components/ui'

import { AverageSalaryCard } from './AverageSalaryCard'
import { HolidaysCard } from './HolidaysCard'

export function HomeInfoGrid() {
    return (
        <Section
            className="py-8"
            spacing="none"
        >
            <Container>
                <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                    <AverageSalaryCard />
                    <HolidaysCard />
                </div>
            </Container>
        </Section>
    )
}
