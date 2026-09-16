import { HiArrowRight } from 'react-icons/hi2'

import { Container, Section } from '@/components/ui'

export function HomeCta({ onClick }: { onClick: () => void }) {
    return (
        <Section
            className="pt-8 pb-12"
            spacing="none"
        >
            <Container>
                <div className="bg-accent text-primary grid gap-8 rounded-xl px-9 py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                    <div>
                        <p className="text-xs font-bold tracking-[0.32em] text-primary/70 uppercase">
                            Почни свій шлях вже сьогодні
                        </p>
                        <h2 className="mt-4 text-4xl font-bold">
                            Знайди роботу своєї мрії
                        </h2>
                        <p className="mt-4 max-w-2xl text-primary/75">
                            Приєднуйся до тисяч людей, які вже працюють у
                            найкращих компаніях Європи разом з VV Work.
                        </p>
                    </div>
                    <button
                        className="bg-primary text-surface hover:bg-panel-dark focus-visible:outline-primary inline-flex h-14 items-center justify-center gap-3 rounded-md px-12 text-lg font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                        onClick={onClick}
                        type="button"
                    >
                        Долучитися
                        <HiArrowRight
                            aria-hidden="true"
                            className="size-5"
                        />
                    </button>
                </div>
            </Container>
        </Section>
    )
}
