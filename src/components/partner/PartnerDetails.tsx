import type { Partner } from '@/types'

export function PartnerDetails({ partner }: { partner: Partner }) {
    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="max-w-3xl">
                <p className="text-muted text-sm font-semibold">
                    Роботодавець
                </p>
                <div className="mt-4 flex items-center gap-4">
                    <span className="bg-primary text-surface flex size-14 items-center justify-center rounded-md text-2xl font-bold">
                        {partner.logo}
                    </span>
                    <div>
                        <h1 className="text-primary text-4xl font-bold md:text-5xl">
                            {partner.name}
                        </h1>
                        {partner.isVerified && (
                            <p className="text-success mt-2 text-sm font-semibold">
                                Перевірений партнер VV Work
                            </p>
                        )}
                    </div>
                </div>
                <p className="text-muted mt-6 text-lg leading-8">
                    {partner.description}
                </p>
            </div>

            <aside className="border-border bg-surface rounded-md border p-6">
                <p className="text-primary text-lg font-bold">
                    Інформація
                </p>
                <dl className="mt-5 grid gap-4 text-sm">
                    <div>
                        <dt className="text-muted">Локація</dt>
                        <dd className="text-primary mt-1 font-semibold">
                            {partner.city}, {partner.country}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-muted">Вакансії</dt>
                        <dd className="text-primary mt-1 font-semibold">
                            {partner.vacanciesCount}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-muted">Напрями</dt>
                        <dd className="mt-2 flex flex-wrap gap-2">
                            {partner.industries.map((industry) => (
                                <span
                                    className="bg-background text-muted rounded-md px-3 py-1.5 text-xs font-semibold"
                                    key={industry.key}
                                >
                                    {industry.label}
                                </span>
                            ))}
                        </dd>
                    </div>
                </dl>
            </aside>
        </div>
    )
}
