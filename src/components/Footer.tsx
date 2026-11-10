import Link from "next/link";
import { Music2, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="relative bg-black text-neutral-400 border-t border-white/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div>
          <div className="flex items-center gap-2.5 text-white font-semibold text-lg mb-4">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300">
              <Music2 className="w-4 h-4" />
            </span>
            <span>Harmony Academy</span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-400">
            Browse the course catalogue or contact us with questions about
            course availability and enrollment.
          </p>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-teal-300 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className="hover:text-teal-300 transition-colors duration-200"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-teal-300 transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-400 shrink-0" />
              <a
                href="mailto:subhanallauddin@gmail.com"
                className="hover:text-teal-300 transition-colors"
              >
                subhanallauddin@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06] py-6 px-4 text-center text-xs sm:text-sm text-neutral-500">
        © {new Date().getFullYear()} Harmony Academy Music School. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
