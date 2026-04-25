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
  // 06 — E2E Anatomy
  {
    en: `Every E2E spec file is structured around 7 mandatory sections. Rendering verifies basic DOM structure — the baseline. Size Contract asserts exact computed pixel values using getComputedStyle, so a 1px drift fails immediately. Color Contract checks computed colors per variant. Animation Contract goes further — it takes two transform snapshots 200ms apart and proves the element is actively rotating. Style Structure snapshots full computed layout properties as a backward-compat guard. Visual Regression does pixel-exact screenshot comparison per variant and OS. Input Variant Contract interactively toggles every input — disabled, loading, destructive — and checks DOM, style, and screenshot for each state.`,
    fa: `هر فایل spec E2E حول ۷ بخش اجباری ساختار یافته. Rendering ساختار پایه DOM رو تایید می‌کنه. Size Contract مقادیر دقیق پیکسلی computed رو assert می‌کنه، پس یه انحراف ۱ پیکسلی فوری شکست می‌خوره. Color Contract رنگ‌های computed رو به ازای هر variant چک می‌کنه. Animation Contract فراتر می‌ره — دو snapshot از transform با فاصله ۲۰۰ms می‌گیره و ثابت می‌کنه که المان واقعاً در حال چرخش است. Style Structure snapshot کامل از خواص layout computed به عنوان نگهبان backward-compat می‌گیره. Visual Regression مقایسه دقیق پیکسل screenshot انجام می‌ده. و Input Variant Contract هر ورودی رو toggle می‌کنه — disabled، loading، destructive — و DOM، style، و screenshot رو برای هر state چک می‌کنه.`,
  },
  // 07 — Why E2E Tests Matter
  {
    en: `Why does each section matter? Because most regressions are invisible in code review. A 1px token drift passes every human eye. A 5% color shift is imperceptible in a diff. A disabled button leaking pointer cursor after a refactor — no reviewer would catch that. These are real scenarios. The E2E layer catches them in CI in seconds, before they reach QA or production. The animation live-check is particularly telling: we don't just verify the keyframe name exists, we take two transform snapshots 200ms apart and assert they differ. If the event loop is blocked, or someone accidentally sets animation-play-state: paused, the values are identical — and the test fails loud.`,
    fa: `چرا هر بخش اهمیت دارد؟ چون بیشتر رگرسیون‌ها در code review نامرئی هستن. یه انحراف ۱ پیکسلی از هر چشم انسانی رد می‌شه. یه shift ۵٪ رنگ در diff غیرقابل تشخیصه. یه دکمه disabled که بعد از ریفکتور cursor: pointer نشان می‌ده — هیچ reviewer‌ای اون رو نمی‌گرفت. اینا سناریوهای واقعی هستن. لایه E2E اونا رو در CI در ثانیه‌ها می‌گیره. بررسی زنده انیمیشن مخصوصاً مهمه: فقط وجود نام keyframe رو تایید نمی‌کنیم، دو snapshot از transform با فاصله ۲۰۰ms می‌گیریم و assert می‌کنیم که متفاوت هستن. اگه event loop بلاک بشه، یا کسی animation-play-state: paused بذاره، مقادیر یکسان می‌شن — و تست بلند شکست می‌خوره.`,
  },
  // 08 — Claude + Rules
  {
    en: `CLAUDE.md is the project memory — Claude reads it at session start and knows our conventions: signal-input patterns, snapshot rules, required spec sections. The slash command is a reusable skill committed to git. Anyone runs /write-package-test and gets spec files matching our style exactly. We dictate the rules; Claude writes the assertions.`,
    fa: `CLAUDE.md حافظه پروژه‌ست — Claude اون رو ابتدای هر سشن می‌خونه و کنوانسیون‌های ما رو می‌دونه: الگوهای signal-input، قوانین snapshot، بخش‌های اجباری spec. slash command یه مهارت قابل استفاده مجدده که توی git commit شده. هر کسی /write-package-test رو اجرا کنه فایل‌های spec با دقیقاً همون استایل می‌گیره. ما قوانین رو دیکته می‌کنیم؛ Claude assertion‌ها رو می‌نویسه.`,
  },
  // 09 — Workflow
  {
    en: `Five steps. Developer ships component + demo page. Invokes /write-package-test. Claude reads the component, demo, and all rules, then emits both spec files. Dev reviews, runs the suite, tunes edge cases. CI runs 1,000+ tests on every push. The critical part: every failure that reveals a new rule gets documented in TESTING.md and the slash command — the loop feeds itself.`,
    fa: `پنج مرحله. توسعه‌دهنده کامپوننت + صفحه دمو رو ارسال می‌کنه. /write-package-test رو صدا می‌زنه. Claude کامپوننت، دمو و همه قوانین رو می‌خونه، بعد هر دو فایل spec رو emit می‌کنه. Dev مرور می‌کنه، suite رو اجرا می‌کنه، edge case‌ها رو تنظیم می‌کنه. CI در هر push بیش از ۱۰۰۰ تست اجرا می‌کنه. بخش مهم: هر شکستی که قانون جدیدی آشکار کنه در TESTING.md و slash command مستند می‌شه — loop به خودش تغذیه می‌کنه.`,
  },
  // 10 — Results
  {
    en: `Measurable impact. Time to write a full test suite dropped from ~1 day to under an hour. QA regression load at the library level dropped to near zero — they now own product-level flows. Developer confidence went up: people refactor shared packages freely because CI has their back. 1,000+ assertions per PR. Zero lib-level QA tickets last cycle.`,
    fa: `تاثیر قابل اندازه‌گیری. زمان نوشتن سوئیت تست کامل از ~۱ روز به زیر یه ساعت رسید. بار رگرسیون QA در سطح کتابخانه به نزدیک صفر رسید — حالا جریان‌های سطح محصول رو در اختیار دارن. اعتماد توسعه‌دهنده بالا رفته: افراد آزادانه پکیج‌های مشترک رو ریفکتور می‌کنن چون CI پشتشونه. بیش از ۱۰۰۰ assertion در هر PR. صفر تیکت QA سطح lib در چرخه آخر.`,
  },
  // 11 — Lessons
  {
    en: `Three rules learned the hard way. First: if the demo doesn't expose a variant, add it — never skip the test. Second: OnPush components need explicit detectChanges() calls; setting an input is not enough to trigger rendering. Third: learning is mandatory — every new rule gets applied to all existing specs and documented, so the next generation starts with the full knowledge base.`,
    fa: `سه قانون که به سختی یاد گرفتیم. اول: اگه دمو یه variant رو نشون نمی‌ده، اضافه‌ش کن — هرگز تست رو skip نکن. دوم: کامپوننت‌های OnPush نیاز به detectChanges() صریح دارن؛ set کردن input برای render شدن کافی نیست. سوم: یادگیری اجباریه — هر قانون جدید به همه spec‌های موجود اعمال و مستند می‌شه، پس نسل بعدی از صفر شروع نمی‌کنه.`,
  },
  // 12 — MCP Overview
  {
    en: `Beyond CLAUDE.md rules and slash commands, Claude Code supports MCP — Model Context Protocol — an open standard for connecting AI to external tools. First-party servers include Figma, Sentry, GitHub, Google Drive, and Slack. Add them once in your project config and they're available in every session. This is what makes the next example possible.`,
    fa: `فراتر از قوانین CLAUDE.md و slash command ها، Claude Code از MCP پشتیبانی می‌کنه — Model Context Protocol — یه استاندارد باز برای اتصال هوش مصنوعی به ابزارهای خارجی. سرورهای first-party شامل Figma، Sentry، GitHub، Google Drive و Slack می‌شن. اونا رو یه بار در کانفیگ پروژه اضافه کنید و در هر سشن آماده به کارن. این همون چیزیه که مثال بعدی رو ممکن می‌کنه.`,
  },
  // 13 — MCP in Practice
  {
    en: `Here's how we used Figma MCP in the Digipay client-monorepo. We connected Figma MCP, read the base-style design tokens — typography scales, color tokens, spacing utilities — and encoded them as hard constraints in CLAUDE.md. The rule is absolute: never hardcode font-size, color, margin, or padding in SCSS — always use the utility classes. This fires regardless of input source: a Figma link, a screenshot, or a manual spec. When a developer sends a Figma URL, Claude doesn't extract pixel values. It maps to t-5, text-onback-brand, p-plus. One setup — permanent memory for every future session.`,
    fa: `اینجاست که ما از Figma MCP در client-monorepo دیجی‌پی استفاده کردیم. Figma MCP رو متصل کردیم، توکن‌های طراحی base-style رو خوندیم — مقیاس‌های typography، توکن‌های رنگ، utility های spacing — و به عنوان محدودیت‌های سخت در CLAUDE.md کد کردیم. قانون مطلقه: هرگز font-size، color، margin یا padding رو در SCSS هارد کد نکن — همیشه از utility class ها استفاده کن. این صرف نظر از منبع ورودی اجرا می‌شه: لینک Figma، screenshot یا spec دستی. وقتی یه developer یه URL فیگما می‌فرسته، Claude مقادیر پیکسل استخراج نمی‌کنه — به t-5، text-onback-brand، p-plus نگاشت می‌کنه. یه بار تنظیم — حافظه دائمی برای هر سشن آینده.`,
  },
  // 14 — Q&A
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
