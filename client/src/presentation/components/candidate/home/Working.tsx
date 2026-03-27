import React from 'react';

function Working() {
  return (
    <div>
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-indigo-400 text-sm font-medium mb-2 tracking-wide uppercase">
            Simple Process
          </p>

          <h2 className="text-3xl font-bold tracking-tight mb-12">
            How JobSphere Works
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: '🔍',
                title: 'Search Jobs',
                desc: 'Browse thousands of listings filtered by role, location, salary, and more.',
              },
              {
                step: '02',
                icon: '📝',
                title: 'Apply Easily',
                desc: 'Submit your profile and resume with one click. No lengthy forms.',
              },
              {
                step: '03',
                icon: '🎉',
                title: 'Get Hired',
                desc: "Hear back from companies and land the career you've been working toward.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group rounded-2xl p-8 bg-white border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-indigo-300"
              >
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>

                <div className="text-xs font-bold text-indigo-400 tracking-widest mb-2">
                  {item.step}
                </div>

                <h3 className="text-lg font-bold mb-2">{item.title}</h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Working;
