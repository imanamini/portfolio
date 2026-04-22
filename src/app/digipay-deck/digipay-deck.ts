import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';

interface SpeakerNote { en: string; fa: string; }

const SPEAKER_NOTES: SpeakerNote[] = [
  // 01 — Title
  {
    en: `Welcome. Today we'll walk through the testing strategy for our shared library monorepo — 76 packages used across every Digipay product — and how Claude AI changed the economics of building and maintaining those tests. Goal: move the testing load off QA onto fast, developer-owned pipelines. 30 minutes. Questions at the end.`,
    fa: `خوش اومدید. امروز می‌خوام استراتژی تست برای مونوریپوی کتابخانه‌های مشترکمون رو توضیح بدم — ۷۶ پکیج که توی همه محصولات دیجی‌پی استفاده می‌شن — و اینکه چطور Claude AI اقتصاد ساخت و نگهداری این تست‌ها رو عوض کرد. هدف: انتقال بار تست از دوش تیم QA به پایپ‌لاین‌های خودکار. ۳۰ دقیقه. سوالات در آخر.`,
  },
  // 02 — The Pain
  {
    en: `Before automation, every library change triggered a full manual regression sweep across every consumer app. QA was the human firewall. A one-line fix in ngx-button could mean days of manual testing. Developers started avoiding refactors entirely — the safest change was no change. Tech debt compounded.`,
    fa: `قبل از اتوماسیون، هر تغییر در کتابخانه‌ها یه رگرسیون دستی کامل روی همه اپ‌های مصرف‌کننده ایجاد می‌کرد. QA دیوار آتشین انسانی بود. یه خط تغییر توی ngx-button می‌تونست منجر به روزها تست دستی بشه. توسعه‌دهنده‌ها شروع کردن به اجتناب از ریفکتور — امن‌ترین تغییر هیچ تغییری بود. بدهی فنی انباشته شد.`,
  },
  // 03 — The Monorepo
  {
    en: `This is our monorepo. 76 shared libraries under projects/. The key design decision: each library has a dedicated demo page at /package/name. Playwright navigates directly to that URL — no mocked environment, no published package. The demo imports from source, so a change shows up instantly.`,
    fa: `این ساختار مونوریپوی ماست. ۷۶ کتابخانه مشترک زیر projects/. تصمیم طراحی اصلی: هر کتابخانه یه صفحه دمو اختصاصی داره در /package/name. Playwright مستقیماً به اون URL می‌ره — بدون محیط شبیه‌سازی‌شده، بدون پکیج منتشرشده. دمو مستقیم از سورس import می‌کنه، پس تغییر فوری دیده می‌شه.`,
  },
  // 04 — Test Architecture
  {
    en: `Two layers, two jobs. Unit tests sit next to the component — fast, headless, verify the API contract: inputs, outputs, OnPush detection. 100% coverage mandatory. E2E tests run on Playwright against the live demo — computed pixel values, visual snapshots, animations, real interactions. Together they give the full picture.`,
    fa: `دو لایه، دو وظیفه. تست‌های یونیت کنار کامپوننت هستن — سریع، headless، قرارداد API رو تایید می‌کنن: ورودی‌ها، خروجی‌ها، تشخیص OnPush. پوشش ۱۰۰٪ اجباری. تست‌های E2E روی Playwright اجرا می‌شن — مقادیر پیکسل محاسبه‌شده، اسنپ‌شات‌های بصری، انیمیشن‌ها، تعاملات واقعی. با هم تصویر کامل می‌دن.`,
  },
  // 05 — Real E2E Test
  {
    en: `A real test from ngx-spinner. We're not just asserting the element exists — we assert the exact computed CSS custom-property value. If someone changes --spinner-size from 16px to 15px, this test fails immediately in CI before the PR merges. This pattern repeats across all 38 spec files.`,
    fa: `یه تست واقعی از ngx-spinner. فقط وجود المان رو چک نمی‌کنیم — مقدار دقیق CSS custom property محاسبه‌شده رو assert می‌کنیم. اگه کسی --spinner-size رو از ۱۶ به ۱۵ تغییر بده، این تست بلافاصله در CI شکست می‌خوره قبل از merge. این الگو در همه ۳۸ فایل spec تکرار می‌شه.`,
  },
  // 06 — Claude + Rules
  {
    en: `CLAUDE.md is the project memory — Claude reads it at session start and knows our conventions: signal-input patterns, snapshot rules, required spec sections. The slash command is a reusable skill committed to git. Anyone runs /write-package-test and gets spec files matching our style exactly. We dictate the rules; Claude writes the assertions.`,
    fa: `CLAUDE.md حافظه پروژه‌ست — Claude اون رو ابتدای هر سشن می‌خونه و کنوانسیون‌های ما رو می‌دونه: الگوهای signal-input، قوانین snapshot، بخش‌های اجباری spec. slash command یه مهارت قابل استفاده مجدده که توی git commit شده. هر کسی /write-package-test رو اجرا کنه فایل‌های spec با دقیقاً همون استایل می‌گیره. ما قوانین رو دیکته می‌کنیم؛ Claude assertion‌ها رو می‌نویسه.`,
  },
  // 07 — Workflow
  {
    en: `Five steps. Developer ships component + demo page. Invokes /write-package-test. Claude reads the component, demo, and all rules, then emits both spec files. Dev reviews, runs the suite, tunes edge cases. CI runs 1,000+ tests on every push. The critical part: every failure that reveals a new rule gets documented in TESTING.md and the slash command — the loop feeds itself.`,
    fa: `پنج مرحله. توسعه‌دهنده کامپوننت + صفحه دمو رو ارسال می‌کنه. /write-package-test رو صدا می‌زنه. Claude کامپوننت، دمو و همه قوانین رو می‌خونه، بعد هر دو فایل spec رو emit می‌کنه. Dev مرور می‌کنه، suite رو اجرا می‌کنه، edge case‌ها رو تنظیم می‌کنه. CI در هر push بیش از ۱۰۰۰ تست اجرا می‌کنه. بخش مهم: هر شکستی که قانون جدیدی آشکار کنه در TESTING.md و slash command مستند می‌شه — loop به خودش تغذیه می‌کنه.`,
  },
  // 08 — Results
  {
    en: `Measurable impact. Time to write a full test suite dropped from ~1 day to under an hour. QA regression load at the library level dropped to near zero — they now own product-level flows. Developer confidence went up: people refactor shared packages freely because CI has their back. 1,000+ assertions per PR. Zero lib-level QA tickets last cycle.`,
    fa: `تاثیر قابل اندازه‌گیری. زمان نوشتن سوئیت تست کامل از ~۱ روز به زیر یه ساعت رسید. بار رگرسیون QA در سطح کتابخانه به نزدیک صفر رسید — حالا جریان‌های سطح محصول رو در اختیار دارن. اعتماد توسعه‌دهنده بالا رفته: افراد آزادانه پکیج‌های مشترک رو ریفکتور می‌کنن چون CI پشتشونه. بیش از ۱۰۰۰ assertion در هر PR. صفر تیکت QA سطح lib در چرخه آخر.`,
  },
  // 09 — Lessons
  {
    en: `Three rules learned the hard way. First: if the demo doesn't expose a variant, add it — never skip the test. Second: OnPush components need explicit detectChanges() calls; setting an input is not enough to trigger rendering. Third: learning is mandatory — every new rule gets applied to all existing specs and documented, so the next generation starts with the full knowledge base.`,
    fa: `سه قانون که به سختی یاد گرفتیم. اول: اگه دمو یه variant رو نشون نمی‌ده، اضافه‌ش کن — هرگز تست رو skip نکن. دوم: کامپوننت‌های OnPush نیاز به detectChanges() صریح دارن؛ set کردن input برای render شدن کافی نیست. سوم: یادگیری اجباریه — هر قانون جدید به همه spec‌های موجود اعمال و مستند می‌شه، پس نسل بعدی از صفر شروع نمی‌کنه.`,
  },
  // 10 — Q&A
  {
    en: `That's the story. 76 shared libraries. 1,000+ tests. Generated by Claude following conventions we control, reviewed by humans, enforced by CI. QA is freed for work requiring real human judgment. Developers ship faster. The contract is enforced by machines, not memory. Happy to take questions.`,
    fa: `این داستانه. ۷۶ کتابخانه مشترک. بیش از ۱۰۰۰ تست. توسط Claude طبق کنوانسیون‌هایی که ما کنترل می‌کنیم تولید شده، توسط انسان‌ها بررسی شده، توسط CI اجرا می‌شه. QA برای کارهایی که نیاز به قضاوت انسانی دارن آزاده. توسعه‌دهنده‌ها سریع‌تر ارسال می‌کنن. قرارداد توسط ماشین‌ها اجرا می‌شه، نه حافظه. خوشحال می‌شم سوالات شما رو بشنوم.`,
  },
];

@Component({
  selector: 'app-digipay-deck',
  standalone: true,
  templateUrl: './digipay-deck.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DigipayDeckComponent implements OnInit, OnDestroy {
  private injected: HTMLElement[] = [];
  private presenterWindow: Window | null = null;
  private onKey = (e: KeyboardEvent) => {
    if (e.key === 'n' || e.key === 'N') this.openPresenter();
  };
  private onMessage = (e: MessageEvent) => {
    if (e.data && typeof e.data.slideIndexChanged === 'number') {
      this.showNote(e.data.slideIndexChanged);
    }
  };

  ngOnInit(): void {
    this.addLink({ rel: 'preconnect', href: 'https://fonts.googleapis.com' });
    this.addLink({ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' });
    this.addLink({
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap',
    });
    this.addLink({ rel: 'stylesheet', href: '/decks/digipay-libs/styles.css' });

    const notes = document.createElement('script');
    notes.type = 'application/json';
    notes.id = 'speaker-notes';
    notes.textContent = JSON.stringify(SPEAKER_NOTES);
    document.body.appendChild(notes);
    this.injected.push(notes);

    const script = document.createElement('script');
    script.src = '/decks/digipay-libs/deck-stage.js';
    script.defer = true;
    document.body.appendChild(script);
    this.injected.push(script);

    const isPresenter = new URLSearchParams(location.search).get('presenter') === '1';
    if (isPresenter) {
      // Presenter window: hide the deck, show notes panel, listen for messages
      const deckStage = document.querySelector('deck-stage') as HTMLElement | null;
      if (deckStage) deckStage.style.display = 'none';
      const panel = document.getElementById('presenter-view');
      if (panel) panel.style.display = 'block';
      this.showNote(0);
      window.addEventListener('message', this.onMessage);
    } else {
      // Main deck: press N to open presenter window
      window.addEventListener('keydown', this.onKey);
      // Forward slidechange events to any open presenter window
      document.addEventListener('slidechange', (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (this.presenterWindow && !this.presenterWindow.closed) {
          this.presenterWindow.postMessage({ slideIndexChanged: detail.index }, '*');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.injected.forEach(el => el.remove());
    this.injected = [];
    window.removeEventListener('keydown', this.onKey);
    window.removeEventListener('message', this.onMessage);
  }

  private openPresenter(): void {
    const url = location.pathname + '?presenter=1';
    if (!this.presenterWindow || this.presenterWindow.closed) {
      this.presenterWindow = window.open(url, 'digipay-presenter', 'width=900,height=600,resizable=yes');
    } else {
      this.presenterWindow.focus();
    }
  }

  private showNote(index: number): void {
    const enEl = document.getElementById('presenter-note-en');
    const faEl = document.getElementById('presenter-note-fa');
    const numEl = document.getElementById('presenter-slide-num');
    const note = SPEAKER_NOTES[index];
    if (enEl) enEl.textContent = note?.en ?? '—';
    if (faEl) faEl.textContent = note?.fa ?? '—';
    if (numEl) numEl.textContent = `${index + 1} / ${SPEAKER_NOTES.length}`;
  }

  private addLink(attrs: Record<string, string>): void {
    const el = document.createElement('link');
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
    this.injected.push(el);
  }
}
