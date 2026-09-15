import { HiArrowRight } from 'react-icons/hi2'

import { Container, Section } from '@/components/ui'

export function HomeCta({ onClick }: { onClick: () => void }) {
    return (
        <Section
            className="pt-8 pb-12"
            spacing="none"
        >
            <Container>
                <div className="bg-primary text-surface grid gap-8 rounded-xl px-9 py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                    <div>
                        <p className="text-xs font-bold tracking-[0.32em] text-white/70 uppercase">
                            Почни свій шлях вже сьогодні
                        </p>
                        <h2 className="mt-4 text-4xl font-bold">
                            Знайди роботу своєї мрії
                        </h2>
                        <p className="mt-4 max-w-2xl text-white/75">
                            Приєднуйся до тисяч людей, які вже працюють у
                            найкращих компаніях Європи разом з VV Work.
                        </p>
                    </div>
                    <button
                        className="bg-accent text-primary hover:bg-accent-hover inline-flex h-14 items-center justify-center gap-3 rounded-md px-12 text-lg font-bold transition-colors"
                        onClick={onClick}
                        type="button"
                    >
                        Долучитися
                        <HiArrowRight className="size-5" />
                    </button>
                </div>
            </Container>
        </Section>
    )
}
