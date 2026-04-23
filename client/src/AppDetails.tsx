
import { useState } from "react";

const application = {
  id: "APP-2041",
  appliedAt: "April 18, 2026",
  job: {
    title: "Senior Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  status: "Shortlisted",
  candidate: {
    name: "Arjun Menon",
    initials: "AM",
    email: "arjun.menon@email.com",
    phone: "+91 98765 43210",
    location: "Kochi, Kerala",
    linkedin: "linkedin.com/in/arjunmenon",
    portfolio: "arjunmenon.dev",
    avatarColor: "bg-indigo-100 text-indigo-700",
  },
  resumeUrl: "#",
  coverLetter:
    "I'm excited to apply for the Senior Frontend Developer role. With 5 years of experience building scalable React applications and a passion for clean UI architecture, I believe I can make a strong contribution to your engineering team. I've led frontend migrations at two startups and have a strong eye for performance and accessibility.",
  skills: ["React", "TypeScript", "Tailwind CSS", "GraphQL", "Node.js", "Figma", "Jest"],
  experience: [
    { role: "Frontend Engineer", company: "TechFlow Inc.", duration: "2022 – Present" },
    { role: "UI Developer", company: "Startup Hub", duration: "2020 – 2022" },
  ],
  education: "B.Tech Computer Science, NIT Calicut (2020)",
  screeningAnswers: [
    {
      q: "How many years of React experience do you have?",
      a: "5 years — built production apps from scratch and led migrations.",
    },
    {
      q: "Are you comfortable working in a fully remote setup?",
      a: "Yes, I've been remote-first for 3+ years with async communication.",
    },
    {
      q: "Expected CTC?",
      a: "₹22–26 LPA, negotiable based on scope.",
    },
  ],
  notes: [
    { author: "Priya (HR)", time: "Apr 19, 10:30 AM", text: "Strong portfolio, check the case study on TechFlow's dashboard." },
    { author: "Rahul (Tech Lead)", time: "Apr 20, 3:00 PM", text: "Reviewed GitHub. Code quality is solid, good TypeScript patterns." },
  ],
  activityLog: [
    { event: "Application received", time: "Apr 18, 9:14 AM" },
    { event: "Viewed by HR", time: "Apr 18, 11:00 AM" },
    { event: "Status changed to Shortlisted", time: "Apr 19, 10:35 AM" },
    { event: "Internal note added", time: "Apr 20, 3:01 PM" },
  ],
};

const STATUS_OPTIONS = ["New", "Reviewed", "Shortlisted", "Interview Scheduled", "Hired", "Rejected"];

const STATUS_STYLES = {
  New: "bg-gray-100 text-gray-700",
  Reviewed: "bg-blue-100 text-blue-700",
  Shortlisted: "bg-indigo-100 text-indigo-700",
  "Interview Scheduled": "bg-amber-100 text-amber-700",
  Hired: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

function Section({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default function ApplicationDetails() {
  const [status, setStatus] = useState(application.status);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(application.notes);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

  const addNote = () => {
    if (!note.trim()) return;
    setNotes([
      ...notes,
      { author: "You", time: "Just now", text: note.trim() },
    ]);
    setNote("");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1">
            ← Back to Applications
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">{application.id}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition">
            Send Message
          </button>
          <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition">
            Schedule Interview
          </button>
          <button
            onClick={() => setShowRejectConfirm(true)}
            className="px-4 py-2 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium transition"
          >
            Reject
          </button>
        </div>
      </div>

      {/* Reject confirm */}
      {showRejectConfirm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full mx-4">
            <h4 className="font-semibold text-gray-800 mb-2">Reject this applicant?</h4>
            <p className="text-sm text-gray-500 mb-4">This will move the application to Rejected. The applicant may be notified.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowRejectConfirm(false)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
              <button
                onClick={() => { setStatus("Rejected"); setShowRejectConfirm(false); }}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Reject
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* LEFT — main content */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Candidate header */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row items-start gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${application.candidate.avatarColor}`}>
              {application.candidate.initials}
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl font-semibold text-gray-900">{application.candidate.name}</h2>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[status]}`}>{status}</span>
                </div>
                <div className="text-xs text-gray-400 shrink-0">Applied {application.appliedAt}</div>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{application.job.title} · {application.job.department}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                <span>📍 {application.candidate.location}</span>
                <a href={`mailto:${application.candidate.email}`} className="text-indigo-600 hover:underline">{application.candidate.email}</a>
                <span>{application.candidate.phone}</span>
              </div>
              <div className="flex gap-3 mt-2 text-sm">
                <a href="#" className="text-indigo-500 hover:underline">🔗 LinkedIn</a>
                <a href="#" className="text-indigo-500 hover:underline">🌐 Portfolio</a>
              </div>
            </div>
          </div>

          {/* Resume + Cover Letter */}
          <Section title="Resume & Cover Letter">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center text-red-600 text-xs font-bold">PDF</div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Arjun_Menon_Resume.pdf</p>
                  <p className="text-xs text-gray-400">Uploaded Apr 18, 2026</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">Preview</button>
                <button className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">Download</button>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{application.coverLetter}</p>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {application.skills.map((s) => (
                <span key={s} className="bg-indigo-50 text-indigo-700 text-sm px-3 py-1 rounded-full font-medium">{s}</span>
              ))}
            </div>
          </Section>

          {/* Experience & Education */}
          <Section title="Experience & Education">
            <div className="space-y-3 mb-4">
              {application.experience.map((e, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium text-gray-800">{e.role}</span>
                    <span className="text-gray-400 mx-1">·</span>
                    <span className="text-gray-500">{e.company}</span>
                  </div>
                  <span className="text-gray-400">{e.duration}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 text-sm text-gray-600">
              🎓 {application.education}
            </div>
          </Section>

          {/* Screening Answers */}
          <Section title="Screening Questions">
            <div className="space-y-4">
              {application.screeningAnswers.map((qa, i) => (
                <div key={i}>
                  <p className="text-sm font-medium text-gray-700 mb-1">Q{i + 1}. {qa.q}</p>
                  <p className="text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">{qa.a}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Internal Notes */}
          <Section title="Internal Notes (visible to your team only)">
            <div className="space-y-3 mb-4">
              {notes.map((n, i) => (
                <div key={i} className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-amber-800">{n.author}</span>
                    <span className="text-amber-500 text-xs">{n.time}</span>
                  </div>
                  <p className="text-amber-900">{n.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNote()}
                placeholder="Add a team note..."
                className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button
                onClick={addNote}
                className="px-4 py-2 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium transition"
              >
                Add
              </button>
            </div>
          </Section>
        </div>

        {/* RIGHT sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-5">

          {/* Job details */}
          <Section title="Applied For">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Position</span><span className="font-medium text-gray-800">{application.job.title}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Department</span><span className="text-gray-700">{application.job.department}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="text-gray-700">{application.job.type}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Location</span><span className="text-gray-700">{application.job.location}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Applied on</span><span className="text-gray-700">{application.appliedAt}</span></div>
            </div>
          </Section>

          {/* Update status */}
          <Section title="Update Status">
            <div className="space-y-2">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition font-medium ${
                    status === s
                      ? `${STATUS_STYLES[s]} border-transparent`
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {status === s && <span className="mr-1.5">✓</span>}
                  {s}
                </button>
              ))}
            </div>
          </Section>

          {/* Activity log */}
          <Section title="Activity Log">
            <div className="space-y-3">
              {application.activityLog.map((log, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full mt-1.5 shrink-0"></div>
                    {i < application.activityLog.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1"></div>}
                  </div>
                  <div className="pb-3">
                    <p className="text-sm text-gray-700">{log.event}</p>
                    <p className="text-xs text-gray-400">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
