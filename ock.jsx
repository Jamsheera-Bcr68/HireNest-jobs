import React from "react";

function ock() {
  return (
    <div>
      <div
        className="min-h-screen bg-stone-50"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {" "}
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`}</style>
        <main className="max-w-7xl mx-auto px-6 md:px-10 py-8 space-y-8">
          <WelcomeSection greeting={greeting} today={today} name={name} />
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rise card-hover bg-white rounded-2xl p-4 ring-1 ring-slate-900/[0.05]"
                  >
                    <SkeletonBlock className="w-8 h-8 rounded-lg mb-3" />
                    <SkeletonBlock className="w-12 h-6 mb-2" />
                    <SkeletonBlock className="w-20 h-3" />
                  </div>
                ))
              : statusData.map((card, i) => (
                  <StatCard key={i} isLoading={false} stat={card} />
                ))}
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Application trend"
              subtitle="Applications vs. hires, last 6 months"
              className="lg:col-span-1"
            >
              {isLoading ? (
                <div className="h-[230px] animate-pulse rounded-2xl bg-stone-50" />
              ) : (
                <ApplicationTrendChart data={appChartData} />
              )}
            </ChartCard>
            {/* <ChartCard
              title="Top performing jobs"
              subtitle="By total applicants"
              className="lg:col-span-1"
            >
              {isLoading ? (
                <div className="h-[230px] animate-pulse rounded-2xl bg-stone-50" />
              ) : (
                <></>
                // <TopJobsChart data={topJobs} />
              )}
            </ChartCard> */}
            <ChartCard
              title="Hiring funnel"
              subtitle="Candidates by pipeline stage"
              className="lg:col-span-1"
            >
              {isLoading ? (
                <div className="h-[230px] animate-pulse rounded-2xl bg-stone-50" />
              ) : (
                <HiringFunnelChart data={appStatusData} />
              )}
            </ChartCard>
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-white border border-stone-100 shadow-sm p-6">
              <SectionHeading
                eyebrow="Calendar"
                title="Upcoming interviews"
                action={{
                  label: "View all",
                  onclick: () => navigate("/company/interviews"),
                }}
              />
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-14 animate-pulse rounded-2xl bg-stone-50"
                    />
                  ))}
                </div>
              ) : interviews.length ? (
                <div className="divide-y divide-stone-50">
                  {interviews.map((iv) => (
                    <InterviewCard key={iv.id} interview={iv} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={CalendarClock}
                  title="No Interview scheduled"
                  subtitle="Interviews you book will show up here."
                />
              )}
            </div>

            <div className="rounded-3xl bg-white border border-stone-100 shadow-sm p-6">
              <SectionHeading
                eyebrow="Pipeline"
                title="Latest applications"
                action={{
                  label: "View all",
                  onclick: () => navigate("/company/jobs"),
                }}
              />
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-14 animate-pulse rounded-2xl bg-stone-50"
                    />
                  ))}
                </div>
              ) : latestApplications.length ? (
                <div className="divide-y divide-stone-50">
                  {latestApplications.map((app) => (
                    <ApplicationRow key={app.id} app={app} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Users}
                  title="No applications yet"
                  subtitle="New candidates will appear here as they apply."
                />
              )}
            </div>
          </section>

          {/* ACTIVE JOBS SUMMARY */}
          <section className="rounded-3xl bg-white border border-stone-100 shadow-sm p-6">
            <SectionHeading
              eyebrow="Active postings"
              title="Job performance summary"
              action={{
                label: "Manage jobs",
                onclick: () => navigate("/company/jobs"),
              }}
            />
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard className="" key={i} />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                {activeJobs.map((job) => (
                  <div
                    key={job.id}
                    className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
                  >
                    <JobSummaryCard job={job} />
                  </div>
                ))}
              </div>
            )}
          </section>
          {/* ACTIVITY + Pendings + QUICK ACTIONS */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 rounded-3xl bg-white border border-stone-100 shadow-sm p-6">
              <SectionHeading eyebrow="Timeline" title="Recent activity" />
              <RecentActivity items={recentActivities} />
            </div>

            <div className="lg:col-span-1 rounded-3xl bg-white border border-stone-100 shadow-sm p-6">
              <SectionHeading eyebrow="Attention" title="Action Pending" />
              <PendingActionsList items={pendingActions} />
            </div>

            <div className="lg:col-span-1 rounded-3xl bg-white border border-stone-100 shadow-sm p-6">
              <SectionHeading eyebrow="Shortcuts" title="Quick actions" />
              <div className="space-y-2.5">
                {quickActions.map((a, i) => (
                  <QuickActionCard key={i} action={a} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ock;
