/* =========================================================
   COMPLIFYGST — SITE SCRIPT
========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- GOOGLE SHEET LEAD LOGGING ---------- */
  const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwC30Xpn4ZOfa2ZPYS1Zk7aNmlUA8dow31mhQHSBPQ3oTAD274ov5VACSo_KPWC76RXpw/exec';
  function logLeadToSheet(data) {
    try {
      fetch(SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.error('Lead logging failed:', err);
    }
  }

  /* ---------- PRELOADER ---------- */
  window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    setTimeout(() => pre.classList.add('hide'), 400);
  });

  /* ---------- AOS INIT ---------- */
  if (window.AOS) AOS.init({ duration: 700, once: true, offset: 60 });

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- NAVBAR SCROLL + MOBILE MENU ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    document.getElementById('backToTop').classList.toggle('show', window.scrollY > 500);
  });

  const navBurger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  navBurger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navBurger.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---------- THEME TOGGLE ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const applyTheme = (mode) => {
    document.body.classList.toggle('light-mode', mode === 'light');
    themeIcon.className = mode === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  };
  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('cgst-theme') || 'dark'; } catch (e) {}
  applyTheme(savedTheme);
  themeToggle.addEventListener('click', () => {
    const next = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('cgst-theme', next); } catch (e) {}
  });

  /* ---------- BACK TO TOP ---------- */
  document.getElementById('backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* =========================================================
     SERVICES DATA
  ========================================================= */
  const services = [
    { icon: 'fa-file-signature', title: 'GST Registration', desc: 'New GST registration for proprietors, firms and companies — fully online, usually within 3–7 days.',
      timeline: '3–7 working days', docs: 'PAN, Aadhaar, photograph, business address proof (electricity bill / rent agreement + NOC), bank account proof, and a digital signature for companies/LLPs.',
      info: `<p>Every business whose turnover crosses the GST threshold (₹40 lakh for most goods sellers, ₹20 lakh for services, lower for special‑category states) — or that sells online, sells inter‑state, or wants to claim Input Tax Credit — needs a GST number before it can legally invoice customers.</p>
      <p>We handle the entire ARN‑to‑GSTIN process: preparing your application on the GST portal, uploading documents in the correct format, responding to any clarification (REG‑03) the department raises, and tracking it through to certificate issuance.</p>
      <h4>What's included</h4>
      <ul><li>Eligibility check and correct constitution/category selection (proprietorship, partnership, company, casual taxable person, etc.)</li>
      <li>Document preparation and application filing on the GST portal</li>
      <li>Handling department queries or physical verification if raised</li>
      <li>GST certificate delivery and a walkthrough of your filing calendar once registered</li></ul>` },
    { icon: 'fa-file-invoice', title: 'GST Return Filing', desc: 'Monthly / quarterly GSTR‑1 and GSTR‑3B filing with ITC reconciliation, done for you every cycle.',
      timeline: 'Every filing cycle, before the statutory due date', docs: 'Sales and purchase invoices for the period, e‑way bills (if any), bank statement, and any credit/debit notes issued.',
      info: `<p>Once registered, every GST‑registered business must file returns on a fixed monthly or quarterly cycle — GSTR‑1 (outward supplies) and GSTR‑3B (summary return and tax payment) — whether or not there was any business activity in that period.</p>
      <p>We collect your sales and purchase data every cycle, reconcile your purchases against your GSTR‑2B (auto‑populated from your suppliers' filings) before claiming Input Tax Credit, and file both returns within the due date so you never carry forward an avoidable late fee.</p>
      <h4>What's included</h4>
      <ul><li>GSTR‑1 (or IFF for QRMP) and GSTR‑3B preparation and filing every cycle</li>
      <li>2B vs purchase register reconciliation before ITC is claimed</li>
      <li>Due‑date reminders sent in advance, not after</li>
      <li>A monthly summary of tax paid, ITC claimed and any mismatches flagged</li></ul>` },
    { icon: 'fa-comments', title: 'GST Consultation', desc: 'One‑on‑one consultation with a partner on rates, classification, exemptions and structuring.',
      timeline: 'Usually a single session, scheduled within 24–48 hours', docs: 'No documents needed to book — just a summary of your query or business scenario.',
      info: `<p>GST classification questions — which HSN/SAC code applies, what rate a specific good or service attracts, whether an exemption is available, or how to structure a transaction to avoid an inverted duty situation — rarely have a one‑line answer. We sit with you directly rather than pointing you to a generic FAQ.</p>
      <h4>What's included</h4>
      <ul><li>A direct call or meeting with a partner, not a call‑centre executive</li>
      <li>Written classification or rate opinion where the answer affects your invoicing</li>
      <li>Guidance on structuring new product lines, contracts or inter‑state supplies</li></ul>` },
    { icon: 'fa-shield-halved', title: 'GST Notice Reply', desc: 'Drafting and filing replies to DRC‑01A, SCNs and departmental notices with supporting evidence.',
      timeline: 'Reply drafted within 48–72 hours of receiving the notice', docs: 'Copy of the notice, relevant invoices/returns for the period in question, and any correspondence already exchanged with the department.',
      info: `<p>A GST notice — whether it's a DRC‑01A intimation, a show‑cause notice (SCN), or a scrutiny query on return mismatches — carries a strict reply deadline, and an unanswered or poorly‑drafted reply can turn a minor mismatch into a demand with interest and penalty.</p>
      <p>We read the notice, identify exactly what the department is alleging, pull the supporting evidence from your filings, and draft a reply that addresses the specific ground raised rather than a generic template response.</p>
      <h4>What's included</h4>
      <ul><li>Notice analysis and identification of the exact allegation/discrepancy</li>
      <li>Drafting and filing of the reply with supporting annexures</li>
      <li>Representation in departmental hearings where personal appearance is required</li></ul>` },
    { icon: 'fa-magnifying-glass-chart', title: 'GST Audit Assistance', desc: 'End‑to‑end support for GST audits — reconciliation, documentation and departmental representation.',
      timeline: 'Varies by scope — typically 1–3 weeks for reconciliation and documentation', docs: 'Full year\'s sales/purchase registers, GSTR‑1/3B/9 filed for the year, e‑way bills, and stock records where applicable.',
      info: `<p>Whether it's a GSTR‑9C reconciliation requirement or a departmental audit under Section 65/66, the process comes down to matching your books against every return you've filed for the year and explaining any variance before the department does it for you.</p>
      <h4>What's included</h4>
      <ul><li>Turnover and ITC reconciliation between books, GSTR‑1, GSTR‑3B and GSTR‑2B</li>
      <li>Documentation of variances with supporting workings</li>
      <li>Representation during departmental audit visits and query resolution</li></ul>` },
    { icon: 'fa-calendar-check', title: 'Annual Return (GSTR‑9)', desc: 'Accurate annual return and reconciliation statement filing before the yearly deadline.',
      timeline: 'Filed before 31st December following the financial year', docs: 'All GSTR‑1 and GSTR‑3B filed during the year, annual books of account, and HSN‑wise summary of outward supplies.',
      info: `<p>GSTR‑9 consolidates everything filed across the year into a single annual return, and GSTR‑9C adds a reconciliation between that return and your audited financial statements where applicable. Errors here are one of the most common triggers for a later notice, so we treat it as a full reconciliation exercise, not a copy‑paste of monthly figures.</p>
      <h4>What's included</h4>
      <ul><li>Consolidation and cross‑check of all monthly/quarterly returns filed</li>
      <li>HSN summary, ITC reversal and reconciliation with books</li>
      <li>GSTR‑9C preparation where turnover crosses the audit threshold</li></ul>` },
    { icon: 'fa-receipt', title: 'Income Tax Return', desc: 'ITR filing for individuals, professionals and businesses, with maximum eligible deductions.',
      timeline: 'Filed well ahead of the 31st July / 31st October due dates', docs: 'Form 16 / salary slips, bank statements, investment proofs (80C/80D etc.), Form 26AS/AIS, and business books where applicable.',
      info: `<p>We prepare and file ITR‑1 through ITR‑6 depending on your income sources — salary, house property, capital gains, business/profession, or a mix — choosing the regime and claiming every deduction you're actually eligible for, in either the old or new tax regime, whichever works out cheaper for you.</p>
      <h4>What's included</h4>
      <ul><li>Regime comparison (old vs new) before filing, so you don't overpay</li>
      <li>Matching income against Form 26AS/AIS to avoid a mismatch notice</li>
      <li>Capital gains, house property and business income computation where applicable</li></ul>` },
    { icon: 'fa-book', title: 'Accounting & Bookkeeping', desc: 'Day‑to‑day bookkeeping in Tally / Zoho Books, reconciled and audit‑ready every month.',
      timeline: 'Ongoing — books closed and reconciled every month', docs: 'Bank statements, sales/purchase invoices, expense vouchers, and payroll data on a monthly basis.',
      info: `<p>We maintain your books in Tally or Zoho Books, reconcile bank transactions monthly, and keep your ledgers audit‑ready so that year‑end filing (ITR, GSTR‑9, ROC) is a formality rather than a scramble.</p>
      <h4>What's included</h4>
      <ul><li>Monthly voucher entry, bank reconciliation and ledger scrutiny</li>
      <li>Debtor/creditor ageing and monthly P&amp;L snapshot</li>
      <li>Books handed over in a format your CA or auditor can use directly</li></ul>` },
    { icon: 'fa-industry', title: 'MSME Registration', desc: 'Udyam / MSME registration to unlock subsidies, priority lending and government tenders.',
      timeline: 'Same‑day to 2 working days', docs: 'PAN, Aadhaar of the proprietor/partner/director, and basic business investment and turnover details.',
      info: `<p>Udyam registration is free, fully online, and self‑certified — but the benefits it unlocks (delayed‑payment protection under the MSME Act, collateral‑free loans, priority‑sector lending, tender preference) only apply once you're registered, so it's worth doing on day one rather than after a payment dispute.</p>
      <h4>What's included</h4>
      <ul><li>Classification (micro/small/medium) based on investment and turnover</li>
      <li>Udyam application filing and certificate issuance</li>
      <li>A short briefing on the benefits you're now eligible to claim</li></ul>` },
    { icon: 'fa-building', title: 'Company Registration', desc: 'Private limited and OPC incorporation, handled from name approval to certificate of incorporation.',
      timeline: 'Typically 7–12 working days', docs: 'PAN, Aadhaar and address proof of all directors/shareholders, registered office proof, and digital signatures.',
      info: `<p>We handle Private Limited and One Person Company incorporation end‑to‑end on the MCA portal — name reservation (SPICe+ Part A), incorporation filing (Part B) with MOA/AOA, PAN/TAN generation, and the certificate of incorporation — plus the first‑stage compliances (bank account, DIN, statutory registers) that follow immediately after.</p>
      <h4>What's included</h4>
      <ul><li>Name approval and drafting of MOA/AOA</li>
      <li>SPICe+ filing, DIN and digital signature coordination</li>
      <li>Certificate of Incorporation, PAN, TAN and initial ROC compliance checklist</li></ul>` },
    { icon: 'fa-handshake', title: 'LLP Registration', desc: 'Limited Liability Partnership formation with drafting of the LLP agreement included.',
      timeline: 'Typically 10–15 working days', docs: 'PAN, Aadhaar and address proof of all designated partners, registered office proof, and digital signatures.',
      info: `<p>An LLP combines the limited liability of a company with the operational flexibility of a partnership, making it a common choice for professional and services firms. We handle name reservation, incorporation (FiLLiP) and draft an LLP agreement tailored to your partners' capital contribution and profit‑sharing terms — the single most common source of future partner disputes when left generic.</p>
      <h4>What's included</h4>
      <ul><li>Name reservation and FiLLiP incorporation filing</li>
      <li>Custom LLP agreement drafting and registration</li>
      <li>PAN, TAN and post‑incorporation compliance checklist</li></ul>` },
    { icon: 'fa-people-arrows', title: 'Partnership Registration', desc: 'Partnership deed drafting and registration, built to prevent future disputes.',
      timeline: 'Deed drafted in 2–3 days; registration 7–10 working days', docs: 'PAN and Aadhaar of all partners, proof of business address, and agreed capital/profit‑sharing terms.',
      info: `<p>A registered partnership deed clearly defines each partner's capital contribution, profit share, decision‑making authority and exit terms — the absence of which is the single biggest cause of partnership breakdowns we see. We draft the deed to your specific terms and register it with the Registrar of Firms.</p>
      <h4>What's included</h4>
      <ul><li>Partnership deed drafting on stamp paper</li>
      <li>Registration with the Registrar of Firms</li>
      <li>PAN application in the firm's name</li></ul>` },
    { icon: 'fa-money-check-dollar', title: 'TDS Return Filing', desc: 'Quarterly TDS return filing (24Q/26Q) with Form 16/16A generation for your deductees.',
      timeline: 'Filed before the quarterly due date (31st of the month after quarter‑end)', docs: 'TDS challans paid during the quarter, deductee PAN details, and salary/payment breakup.',
      info: `<p>Businesses deducting TDS on salaries, contractor payments, rent or professional fees must file quarterly returns (24Q for salaries, 26Q for other payments) and issue Form 16/16A to deductees. Errors or delays here directly affect your deductees' own ITR filing, so accuracy and timeliness both matter.</p>
      <h4>What's included</h4>
      <ul><li>Challan‑to‑deduction matching and return preparation</li>
      <li>24Q/26Q filing every quarter</li>
      <li>Form 16/16A generation for all deductees</li></ul>` },
    { icon: 'fa-scale-balanced', title: 'ROC Compliance', desc: 'Annual ROC filings, DIN/KYC and event‑based compliance for companies and LLPs.',
      timeline: 'Annual filings due within statutory timelines post AGM/financial year‑end', docs: 'Audited financial statements, board resolutions, and details of any changes (directors, address, capital) during the year.',
      info: `<p>Companies and LLPs carry ongoing obligations to the Registrar of Companies beyond incorporation — annual returns (AOC‑4, MGT‑7), director KYC (DIR‑3 KYC), and event‑based filings whenever there's a change in directors, registered office or share capital. Missing these attracts daily penalties that add up fast.</p>
      <h4>What's included</h4>
      <ul><li>Annual ROC filings (AOC‑4, MGT‑7/7A) and DIN KYC</li>
      <li>Event‑based filings for any changes during the year</li>
      <li>A compliance calendar so nothing is missed</li></ul>` },
    { icon: 'fa-users-gear', title: 'Payroll Services', desc: 'Salary processing, PF/ESIC compliance and payslip generation for your growing team.',
      timeline: 'Ongoing — processed every pay cycle', docs: 'Employee master data, attendance/leave records, and salary structure for each employee.',
      info: `<p>We run your monthly payroll cycle end‑to‑end — salary computation, statutory deductions (PF, ESIC, PT, TDS), payslip generation, and the monthly/annual PF and ESIC filings that go with having employees on payroll.</p>
      <h4>What's included</h4>
      <ul><li>Monthly salary processing and payslip generation</li>
      <li>PF, ESIC and Professional Tax computation and filing</li>
      <li>Form 16 (Part B) support for employees at year‑end</li></ul>` },
  ];
  document.getElementById('servicesGrid').innerHTML = services.map((s, i) => `
    <div class="service-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 80}">
      <div class="service-icon"><i class="fa-solid ${s.icon}"></i></div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <div class="service-actions">
        <button type="button" class="sa-learn" data-service="${i}">Learn More</button>
        <a href="#contact" class="sa-book">Book Now</a>
      </div>
    </div>`).join('');

  /* ---------- SERVICE INFO MODAL ---------- */
  const serviceModal = document.getElementById('serviceModal');
  const serviceModalContent = document.getElementById('serviceModalContent');
  document.querySelectorAll('.sa-learn').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = services[parseInt(btn.dataset.service, 10)];
      serviceModalContent.innerHTML = `
        <button class="modal-close" id="serviceModalClose"><i class="fa-solid fa-xmark"></i></button>
        <span class="article-cat"><i class="fa-solid ${s.icon}"></i> Service Details</span>
        <h3>${s.title}</h3>
        <div class="article-meta"><span><i class="fa-solid fa-clock"></i> ${s.timeline}</span></div>
        <div class="article-body">
          ${s.info}
          <div class="article-callout"><strong>Documents typically needed:</strong> ${s.docs}</div>
        </div>
        <div class="article-cta">
          <a href="#contact" class="btn btn-gold" id="serviceModalContact">Book This Service <i class="fa-solid fa-arrow-right"></i></a>
          <a href="https://wa.me/918356050822" target="_blank" class="btn btn-outline"><i class="fa-brands fa-whatsapp"></i> Ask on WhatsApp</a>
        </div>`;
      serviceModal.classList.add('open');
      document.getElementById('serviceModalClose').addEventListener('click', () => serviceModal.classList.remove('open'));
      document.getElementById('serviceModalContact').addEventListener('click', () => serviceModal.classList.remove('open'));
    });
  });
  serviceModal.addEventListener('click', (e) => { if (e.target === serviceModal) serviceModal.classList.remove('open'); });

  /* =========================================================
     PRICING MODAL
  ========================================================= */
  const planModal = document.getElementById('planModal');
  const modalPlanName = document.getElementById('modalPlanName');
  const modalPlanInput = document.getElementById('modalPlanInput');

  document.querySelectorAll('.select-plan').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.plan;
      modalPlanName.textContent = plan;
      modalPlanInput.value = plan;
      planModal.classList.add('open');
    });
  });
  document.getElementById('planModalClose').addEventListener('click', () => planModal.classList.remove('open'));
  planModal.addEventListener('click', (e) => { if (e.target === planModal) planModal.classList.remove('open'); });

  document.getElementById('planForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const plan = f.get('plan');
    const msg = `Hello ComplifyGST,%0A%0AI want to purchase the ${plan} Plan.%0A%0A` +
      `Name: ${f.get('name')}%0A` +
      `Business Name: ${f.get('business') || '-'}%0A` +
      `Phone: ${f.get('phone')}%0A` +
      `GST Number: ${f.get('gst') || '-'}%0A` +
      `State: ${f.get('state')}%0A` +
      `Email: ${f.get('email')}%0A` +
      `Message: ${f.get('message') || '-'}%0A%0A` +
      `Please contact me.`;
    const mailBody = decodeURIComponent(msg).replace(/%0A/g, '\n');
    logLeadToSheet({
      name: f.get('name'), business: f.get('business'), phone: f.get('phone'),
      email: f.get('email'), gst: f.get('gst'), state: f.get('state'),
      plan: plan, message: f.get('message'), source: 'Plan Enquiry Form'
    });
    window.open(`https://wa.me/918356050822?text=${msg}`, '_blank');
    setTimeout(() => {
      window.open(`mailto:complifygst@gmail.com?subject=${encodeURIComponent('New Enquiry - ' + plan + ' Plan')}&body=${encodeURIComponent(mailBody)}`, '_blank');
    }, 600);
    planModal.classList.remove('open');
    e.target.reset();
    alert('Thank you! Continuing on WhatsApp — our team will confirm your plan shortly.');
  });

  /* =========================================================
     ANIMATED COUNTERS
  ========================================================= */
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('en-IN') + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* =========================================================
     TESTIMONIALS
  ========================================================= */
  const reviews = [
    { name: 'Rohit Mehta', biz: 'Retail Trader, Mumbai', text: 'Switched from our old CA to ComplifyGST last year. Filings are on time every single month and Krishna personally calls if anything looks off.' },
    { name: 'Anita Deshmukh', biz: 'E‑commerce Seller, Pune', text: 'Got a GST notice that had me worried for days. Their team drafted the reply within 48 hours and it was resolved without any penalty.' },
    { name: 'Farhan Sheikh', biz: 'Restaurant Owner, Thane', text: 'Affordable, responsive, and they actually explain things in plain language instead of jargon. Highly recommend for small businesses.' },
    { name: 'Priya Nair', biz: 'Boutique Owner, Navi Mumbai', text: 'Company registration and GST setup done together in under 10 days. Very smooth onboarding and constant WhatsApp updates.' },
    { name: 'Sandeep Rao', biz: 'IT Consultant, Bengaluru', text: 'Been with the Professional plan for 8 months. The monthly GST health report alone has saved me from two ITC mismatches.' },
    { name: 'Kavita Joshi', biz: 'Manufacturing Unit, Nashik', text: 'Their audit assistance team is thorough and patient — walked us through every reconciliation line by line before submission.' },
  ];
  document.getElementById('reviewsTrack').innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-stars">${'<i class="fa-solid fa-star"></i>'.repeat(5)}</div>
      <p class="review-text">&ldquo;${r.text}&rdquo;</p>
      <div class="review-person">
        <div class="review-avatar">${r.name.charAt(0)}</div>
        <div><b>${r.name}</b><span>${r.biz}</span></div>
      </div>
    </div>`).join('');

  const track = document.getElementById('reviewsTrack');
  document.getElementById('revNext').addEventListener('click', () => track.scrollBy({ left: 360, behavior: 'smooth' }));
  document.getElementById('revPrev').addEventListener('click', () => track.scrollBy({ left: -360, behavior: 'smooth' }));

  /* =========================================================
     GST TOOLS
  ========================================================= */
  const tools = [
    { icon: 'fa-calculator', title: 'GST Calculator', desc: 'Add or remove GST from any amount instantly.', key: 'gstCalc' },
    { icon: 'fa-magnifying-glass', title: 'HSN Search', desc: 'Look up common HSN/SAC codes and rates.', key: 'hsnSearch' },
    { icon: 'fa-calendar-days', title: 'Due Date Calendar', desc: 'Never miss a GST filing deadline again.', key: 'dueDates' },
    { icon: 'fa-hourglass-half', title: 'Late Fee Calculator', desc: 'Estimate late fees for delayed GSTR‑3B filing.', key: 'lateFee' },
    { icon: 'fa-percent', title: 'Interest Calculator', desc: 'Calculate interest on delayed GST tax payment.', key: 'interest' },
    { icon: 'fa-file-invoice-dollar', title: 'Invoice Generator', desc: 'Create a simple GST‑compliant invoice in seconds.', key: 'invoice' },
    { icon: 'fa-coins', title: 'ITC Calculator', desc: 'Estimate eligible Input Tax Credit on purchases.', key: 'itc' },
  ];
  document.getElementById('toolsGrid').innerHTML = tools.map(t => `
    <div class="tool-card" data-aos="fade-up">
      <i class="fa-solid ${t.icon}"></i>
      <h4>${t.title}</h4>
      <p>${t.desc}</p>
      <button class="open-tool" data-tool="${t.key}">Use Tool <i class="fa-solid fa-arrow-right"></i></button>
    </div>`).join('');

  const toolModal = document.getElementById('toolModal');
  const toolModalContent = document.getElementById('toolModalContent');
  document.getElementById('toolModalClose').addEventListener('click', () => toolModal.classList.remove('open'));
  toolModal.addEventListener('click', (e) => { if (e.target === toolModal) toolModal.classList.remove('open'); });

  const toolTemplates = {
    gstCalc: `
      <h3><i class="fa-solid fa-calculator"></i> GST Calculator</h3>
      <div class="form-group"><label>Amount (₹)</label><input type="number" id="gcAmount" placeholder="e.g. 10000"></div>
      <div class="form-group"><label>GST Rate</label>
        <select id="gcRate"><option value="5">5%</option><option value="12">12%</option><option value="18" selected>18%</option><option value="28">28%</option></select>
      </div>
      <div class="form-group"><label>Calculation Type</label>
        <select id="gcType"><option value="add">Add GST (Exclusive → Inclusive)</option><option value="remove">Remove GST (Inclusive → Exclusive)</option></select>
      </div>
      <button class="btn btn-gold full-w" id="gcCalc">Calculate</button>
      <div class="tool-result" id="gcResult" style="display:none;"></div>
      <p class="tool-note">For exact figures on your specific transaction, message us on WhatsApp.</p>`,
    lateFee: `
      <h3><i class="fa-solid fa-hourglass-half"></i> Late Fee Calculator</h3>
      <div class="form-group"><label>Days Delayed</label><input type="number" id="lfDays" placeholder="e.g. 15"></div>
      <div class="form-group"><label>Return Type</label>
        <select id="lfType"><option value="20">GSTR‑3B (₹20/day, ₹10 CGST + ₹10 SGST — NIL return)</option><option value="50">GSTR‑3B (₹50/day, ₹25 CGST + ₹25 SGST — normal return)</option></select>
      </div>
      <button class="btn btn-gold full-w" id="lfCalc">Calculate</button>
      <div class="tool-result" id="lfResult" style="display:none;"></div>
      <p class="tool-note">Illustrative estimate only, capped as per current CBIC notification limits.</p>`,
    interest: `
      <h3><i class="fa-solid fa-percent"></i> Interest Calculator</h3>
      <div class="form-group"><label>Outstanding Tax (₹)</label><input type="number" id="itAmount" placeholder="e.g. 25000"></div>
      <div class="form-group"><label>Days Delayed</label><input type="number" id="itDays" placeholder="e.g. 20"></div>
      <button class="btn btn-gold full-w" id="itCalc">Calculate (18% p.a.)</button>
      <div class="tool-result" id="itResult" style="display:none;"></div>
      <p class="tool-note">Standard interest rate under Section 50 is 18% per annum on delayed tax payment.</p>`,
    itc: `
      <h3><i class="fa-solid fa-coins"></i> ITC Calculator</h3>
      <div class="form-group"><label>Total Purchase Value (₹, excl. GST)</label><input type="number" id="itcAmount" placeholder="e.g. 50000"></div>
      <div class="form-group"><label>GST Rate on Purchase</label>
        <select id="itcRate"><option value="5">5%</option><option value="12">12%</option><option value="18" selected>18%</option><option value="28">28%</option></select>
      </div>
      <button class="btn btn-gold full-w" id="itcCalc">Calculate Eligible ITC</button>
      <div class="tool-result" id="itcResult" style="display:none;"></div>
      <p class="tool-note">Assumes the supplier has filed GSTR‑1 and the invoice reflects in your GSTR‑2B.</p>`,
    invoice: `
      <h3><i class="fa-solid fa-file-invoice-dollar"></i> Quick Invoice Generator</h3>
      <div class="form-row">
        <div class="form-group"><label>Buyer Name</label><input type="text" id="ivBuyer" placeholder="Client name"></div>
        <div class="form-group"><label>Invoice No.</label><input type="text" id="ivNo" placeholder="INV-001"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Item / Service</label><input type="text" id="ivItem" placeholder="Description"></div>
        <div class="form-group"><label>Amount (₹)</label><input type="number" id="ivAmount" placeholder="e.g. 15000"></div>
      </div>
      <div class="form-group"><label>GST Rate</label>
        <select id="ivRate"><option value="5">5%</option><option value="12">12%</option><option value="18" selected>18%</option><option value="28">28%</option></select>
      </div>
      <button class="btn btn-gold full-w" id="ivCalc">Generate Summary</button>
      <div class="tool-result" id="ivResult" style="display:none;"></div>
      <p class="tool-note">For a fully formatted, GST‑compliant invoice PDF, talk to our team.</p>`,
    hsnSearch: `
      <h3><i class="fa-solid fa-magnifying-glass"></i> HSN / SAC Quick Search</h3>
      <div class="form-group"><label>Search by keyword</label><input type="text" id="hsnQuery" placeholder="e.g. textile, restaurant, software"></div>
      <table class="tool-table"><thead><tr><th>Item</th><th>HSN/SAC</th><th>Rate</th></tr></thead><tbody id="hsnBody"></tbody></table>
      <p class="tool-note">Common codes shown for reference — confirm exact classification with our team.</p>`,
    dueDates: `
      <h3><i class="fa-solid fa-calendar-days"></i> GST Due Date Calendar</h3>
      <table class="tool-table"><thead><tr><th>Return</th><th>Frequency</th><th>Due Date</th></tr></thead>
      <tbody>
        <tr><td>GSTR‑1</td><td>Monthly</td><td>11th of next month</td></tr>
        <tr><td>GSTR‑1 (QRMP)</td><td>Quarterly</td><td>13th of month after quarter</td></tr>
        <tr><td>GSTR‑3B</td><td>Monthly</td><td>20th of next month</td></tr>
        <tr><td>GSTR‑3B (QRMP)</td><td>Quarterly</td><td>22nd/24th (state-wise)</td></tr>
        <tr><td>GSTR‑9</td><td>Annual</td><td>31st December</td></tr>
        <tr><td>CMP‑08</td><td>Quarterly</td><td>18th of month after quarter</td></tr>
        <tr><td>TDS Return (26Q/24Q)</td><td>Quarterly</td><td>31st of month after quarter</td></tr>
      </tbody></table>
      <p class="tool-note">Dates follow standard CBIC schedule — always confirm for any government extension.</p>`
  };

  const hsnData = [
    ['Cotton textile fabric', '5208', '5%'], ['Readymade garments', '6109', '5% / 18%'],
    ['Restaurant service (non‑AC)', '996331', '5%'], ['Restaurant service (AC)', '996331', '5%'],
    ['Software / SaaS service', '998314', '18%'], ['Mobile phones', '8517', '18%'],
    ['Furniture', '9403', '18%'], ['Two-wheelers (up to 350cc)', '8711', '18%'],
    ['Rice (branded)', '1006', '5%'], ['Consulting services', '998311', '18%'],
    ['Construction services', '9954', '18% / 5%'], ['Gold jewellery', '7113', '3%'],
    ['Financial & banking services', '9971', '18%'], ['Non‑residential property renting/leasing', '997212', '18%'],
    ['Residential property renting/leasing', '997211', 'Nil (residential use)'],
    ['Legal services', '998213', '18%'], ['Goods transport agency (GTA)', '996511', '5% (no ITC) / 18% (with ITC)'],
    ['Job work – textiles & apparel', '9988', '5%'], ['Individual health/life insurance', '997133', 'Nil'],
    ['Educational services (school/college)', '9992', 'Nil'], ['Works contract services', '995461', '18%'],
    ['Manpower supply / recruitment services', '998519', '18%'], ['Courier & cargo handling services', '996812', '18%'],
  ];

  document.querySelectorAll('.open-tool').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.tool;
      toolModalContent.innerHTML = toolTemplates[key];
      toolModal.classList.add('open');
      bindToolLogic(key);
    });
  });

  function bindToolLogic(key) {
    if (key === 'gstCalc') {
      document.getElementById('gcCalc').addEventListener('click', () => {
        const amt = parseFloat(document.getElementById('gcAmount').value) || 0;
        const rate = parseFloat(document.getElementById('gcRate').value);
        const type = document.getElementById('gcType').value;
        const res = document.getElementById('gcResult');
        res.style.display = 'block';
        if (type === 'add') {
          const gst = amt * rate / 100;
          res.innerHTML = `GST Amount: <b>₹${gst.toFixed(2)}</b><br>Total (Inclusive): <b>₹${(amt + gst).toFixed(2)}</b>`;
        } else {
          const base = amt / (1 + rate / 100);
          const gst = amt - base;
          res.innerHTML = `Base Amount: <b>₹${base.toFixed(2)}</b><br>GST Amount: <b>₹${gst.toFixed(2)}</b>`;
        }
      });
    }
    if (key === 'lateFee') {
      document.getElementById('lfCalc').addEventListener('click', () => {
        const days = parseFloat(document.getElementById('lfDays').value) || 0;
        const perDay = parseFloat(document.getElementById('lfType').value);
        const res = document.getElementById('lfResult');
        const fee = Math.min(days * perDay, perDay === 20 ? 500 : 10000);
        res.style.display = 'block';
        res.innerHTML = `Estimated Late Fee: <b>₹${fee.toLocaleString('en-IN')}</b>`;
      });
    }
    if (key === 'interest') {
      document.getElementById('itCalc').addEventListener('click', () => {
        const amt = parseFloat(document.getElementById('itAmount').value) || 0;
        const days = parseFloat(document.getElementById('itDays').value) || 0;
        const res = document.getElementById('itResult');
        const interest = (amt * 18 * days) / (100 * 365);
        res.style.display = 'block';
        res.innerHTML = `Estimated Interest: <b>₹${interest.toFixed(2)}</b>`;
      });
    }
    if (key === 'itc') {
      document.getElementById('itcCalc').addEventListener('click', () => {
        const amt = parseFloat(document.getElementById('itcAmount').value) || 0;
        const rate = parseFloat(document.getElementById('itcRate').value);
        const res = document.getElementById('itcResult');
        const itc = amt * rate / 100;
        res.style.display = 'block';
        res.innerHTML = `Eligible ITC: <b>₹${itc.toFixed(2)}</b>`;
      });
    }
    if (key === 'invoice') {
      document.getElementById('ivCalc').addEventListener('click', () => {
        const buyer = document.getElementById('ivBuyer').value || 'Client';
        const no = document.getElementById('ivNo').value || 'INV-001';
        const item = document.getElementById('ivItem').value || 'Service';
        const amt = parseFloat(document.getElementById('ivAmount').value) || 0;
        const rate = parseFloat(document.getElementById('ivRate').value);
        const gst = amt * rate / 100;
        const res = document.getElementById('ivResult');
        res.style.display = 'block';
        res.innerHTML = `Invoice ${no} — ${buyer}<br>${item}: ₹${amt.toFixed(2)}<br>GST @${rate}%: ₹${gst.toFixed(2)}<br>Total: <b>₹${(amt + gst).toFixed(2)}</b>`;
      });
    }
    if (key === 'hsnSearch') {
      const body = document.getElementById('hsnBody');
      const render = (list) => body.innerHTML = list.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('');
      render(hsnData);
      document.getElementById('hsnQuery').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        render(hsnData.filter(r => r[0].toLowerCase().includes(q)));
      });
    }
  }

  /* =========================================================
     BLOG
  ========================================================= */
  const posts = [
    { cat: 'GST Updates', icon: 'fa-newspaper', title: 'GST Rate Rationalisation: What Changed and Who It Affects', excerpt: 'A plain‑language breakdown of the latest GST Council rate changes and what they mean for your monthly filing.', date: 'Jun 2026', read: '5 min read',
      article: `
      <h4>What actually changed</h4>
      <p>At the 56th GST Council meeting held on 3rd September 2025, the government approved "GST 2.0" — the biggest rate overhaul since GST launched in 2017. The changes took effect from <strong>22nd September 2025</strong>. The old five‑tier structure of 0%, 5%, 12%, 18% and 28% was collapsed into a simpler system.</p>
      <table class="article-table">
        <thead><tr><th>Old structure</th><th>New structure (from 22 Sep 2025)</th></tr></thead>
        <tbody>
          <tr><td>0%, 5%, 12%, 18%, 28% (5 slabs)</td><td>Nil, 5%, 18%, and 40% (demerit rate)</td></tr>
          <tr><td>28% + compensation cess on luxury/sin goods</td><td>Single 40% rate — cess folded in for most items</td></tr>
          <tr><td>Niche rates on gems/jewellery</td><td>0.25% and 3% retained unchanged</td></tr>
        </tbody>
      </table>
      <p>In short: the 12% slab was scrapped and most of those items moved down to 5%. The 28% slab was also scrapped — around 90% of those items moved down to 18%, while select luxury and "sin" goods (tobacco, pan masala, aerated drinks, high‑end vehicles) moved up to the new 40% rate.</p>
      <h4>Who benefits</h4>
      <ul>
        <li>Households — daily essentials, dairy, packaged foods, soaps, shampoo and toothpaste dropped from 18%/12% to 5%.</li>
        <li>Healthcare — several life‑saving drugs and medical devices moved to nil or 5%, and individual health and life insurance premiums are now fully exempt.</li>
        <li>Consumer durables — ACs, TVs, refrigerators and washing machines dropped from 28% to 18%.</li>
        <li>Automobiles — small cars and motorcycles up to 350cc moved down from 28% to 18%.</li>
      </ul>
      <h4>What it means for your filing</h4>
      <p>If any product or service you sell moved slabs, every invoice raised on or after 22nd September 2025 must reflect the new rate — an invoice still showing the old 12% or 28% is non‑compliant and can attract a penalty under Section 122 of the CGST Act. Beyond rates, you'll also need to:</p>
      <ul>
        <li>Update your billing/ERP software's HSN‑to‑rate mapping</li>
        <li>Re‑check contracts where the GST component was quoted separately, since the tax portion has changed</li>
        <li>Renumber invoice/debit/credit note series where required for FY 2026‑27</li>
        <li>File a fresh Letter of Undertaking (LUT) for FY 2026‑27 if you're an exporter, before raising any export invoice</li>
      </ul>
      <div class="article-callout">Not sure which slab your product or service now falls under? Send us your HSN/SAC code on WhatsApp and we'll confirm the correct rate before you invoice.</div>`
    },
    { cat: 'Income Tax Updates', icon: 'fa-scale-balanced', title: 'New vs Old Tax Regime: A Simple Comparison for FY 2025‑26', excerpt: 'Still confused about which regime saves you more? Here is a straightforward, date‑wise breakdown of both.', date: 'Jun 2026', read: '4 min read',
      article: `
      <h4>What changed, and when</h4>
      <p>The new tax regime (Section 115BAC) has been the <strong>default regime</strong> for every taxpayer since FY 2023‑24, introduced in Budget 2023. You can still opt for the old regime instead when filing, as long as you don't have business income (in which case switching is more restricted).</p>
      <p>Budget 2025 then made the new regime significantly more attractive, with the changes <strong>effective from 1st April 2025 (FY 2025‑26, AY 2026‑27)</strong>: the basic exemption limit was raised to ₹4 lakh, the Section 87A rebate was raised so that taxable income up to ₹12 lakh attracts zero tax, and the standard deduction for salaried individuals/pensioners stayed at ₹75,000. Budget 2026 (presented February 2026) made no further changes — these same slabs and rebate limits continue to apply for FY 2026‑27 as well.</p>
      <h4>New regime slab rates (FY 2025‑26 &amp; FY 2026‑27)</h4>
      <table class="article-table">
        <thead><tr><th>Income slab</th><th>Rate</th></tr></thead>
        <tbody>
          <tr><td>₹0 – ₹4,00,000</td><td>Nil</td></tr>
          <tr><td>₹4,00,001 – ₹8,00,000</td><td>5%</td></tr>
          <tr><td>₹8,00,001 – ₹12,00,000</td><td>10%</td></tr>
          <tr><td>₹12,00,001 – ₹16,00,000</td><td>15%</td></tr>
          <tr><td>₹16,00,001 – ₹20,00,000</td><td>20%</td></tr>
          <tr><td>₹20,00,001 – ₹24,00,000</td><td>25%</td></tr>
          <tr><td>Above ₹24,00,000</td><td>30%</td></tr>
        </tbody>
      </table>
      <p>Because of the ₹60,000 rebate under Section 87A, a resident individual with taxable income up to ₹12 lakh pays <strong>zero tax</strong> in the new regime. Add the ₹75,000 standard deduction for salaried employees, and a gross salary up to roughly <strong>₹12.75 lakh</strong> can be entirely tax‑free. There's also marginal relief for income just above ₹12 lakh (up to ~₹12.75 lakh), so a small increase in income doesn't push you into a disproportionately larger tax bill.</p>
      <h4>Old regime — unchanged</h4>
      <p>The old regime's slabs were not touched by Budget 2025 or 2026: nil up to ₹2.5 lakh, 5% up to ₹5 lakh, 20% up to ₹10 lakh, and 30% above that (for individuals under 60). Senior citizens (60+) get a higher exemption of ₹3 lakh, and super senior citizens (80+) get ₹5 lakh. Standard deduction is ₹50,000, and the Section 87A rebate under this regime is ₹12,500 for taxable income up to ₹5 lakh.</p>
      <h4>Benefits of each regime</h4>
      <ul>
        <li><strong>New regime:</strong> lower rates, wider nil bands, effectively zero tax up to ~₹12.75 lakh gross salary, no need to invest just to save tax, and far less paperwork at filing time.</li>
        <li><strong>Old regime:</strong> still allows deductions the new regime doesn't — HRA, Section 80C investments (₹1.5 lakh), Section 80D health insurance, home loan interest, and NPS employer contribution under 80CCD(2). If your total eligible deductions are large, this can work out cheaper.</li>
      </ul>
      <div class="article-callout">As a rough rule of thumb, if your total deductions and exemptions cross roughly <strong>₹4–4.25 lakh</strong>, the old regime may save you more. Below that, the new regime almost always wins. The exact break‑even point shifts with your income level, so it's worth running both numbers before you file.</div>
      <p class="tool-note" style="margin-top:0;">Note: sections are being renumbered under the new Income Tax Act, 2025 (effective 1st April 2026) — for example Section 80C becomes Section 123 — but the rates, slabs and benefits described above are unchanged.</p>`
    },
    { cat: 'Business Compliance', icon: 'fa-clipboard-check', title: '5 Compliance Mistakes That Attract GST Notices', excerpt: 'The most common filing errors we see — and exactly how to avoid each one.', date: 'May 2026', read: '6 min read',
      article: `
      <p>Most GST notices we help clients respond to trace back to one of a handful of recurring errors. Here's what to watch for.</p>
      <h4>1. Claiming ITC that doesn't match GSTR‑2B</h4>
      <p>Input Tax Credit claimed in GSTR‑3B that doesn't reconcile with your auto‑populated GSTR‑2B is one of the most common triggers for a DRC‑01A intimation. Always reconcile before filing, not after a notice arrives.</p>
      <h4>2. Filing GSTR‑3B before GSTR‑1 is finalised</h4>
      <p>Rushing the summary return before your outward supply data is locked in GSTR‑1 often causes figures to diverge between the two returns — a mismatch the department's system flags automatically.</p>
      <h4>3. Wrong HSN/SAC classification</h4>
      <p>Using an outdated or incorrect HSN code — especially since rates were rationalised in September 2025 — can mean you're charging the wrong tax rate entirely, which is treated far more seriously than a filing delay.</p>
      <h4>4. Treating GSTR‑9 as a formality</h4>
      <p>Annual return filing is frequently done as a copy‑paste of the year's monthly figures without actually reconciling against books of account. Any variance the department finds later is far harder to explain after the fact.</p>
      <h4>5. Missing the reply window on a notice</h4>
      <p>Notices come with a strict reply deadline (commonly 15–30 days). An unanswered notice is often treated as an admission, converting what might have been a clarification into a confirmed demand with interest and penalty.</p>
      <div class="article-callout">If you've received any notice and the deadline is approaching, don't wait — message us the notice copy on WhatsApp and we'll tell you exactly what's needed.</div>`
    },
    { cat: 'Company Registration', icon: 'fa-building', title: 'Private Limited vs LLP: Which Should You Register?', excerpt: 'A founder‑friendly comparison of liability, compliance load and cost between the two structures.', date: 'May 2026', read: '5 min read',
      article: `
      <p>Both structures give owners limited liability, but they differ in almost everything else. Here's the comparison founders ask us about most.</p>
      <table class="article-table">
        <thead><tr><th></th><th>Private Limited Company</th><th>LLP</th></tr></thead>
        <tbody>
          <tr><td>Ownership</td><td>Shareholders + Directors, can issue shares</td><td>Designated partners, no share capital concept</td></tr>
          <tr><td>Fundraising</td><td>Easier to raise VC/equity funding</td><td>Harder — investors generally prefer companies</td></tr>
          <tr><td>Compliance load</td><td>Higher — statutory audit regardless of size, board meetings, more ROC filings</td><td>Lower — audit only above turnover/contribution thresholds</td></tr>
          <tr><td>Cost of running</td><td>Higher (auditor, company secretary in larger cases)</td><td>Lower</td></tr>
          <tr><td>Best suited for</td><td>Startups planning to raise funding, scale, or issue ESOPs</td><td>Professional services firms, consultancies, small partnerships wanting liability protection with lower compliance</td></tr>
        </tbody>
      </table>
      <p>If you're building something that will eventually need outside investment, a Private Limited Company is almost always the right starting point — changing structure later is possible but adds cost and delay. If you're a services business run by a small group of partners who don't need external equity, an LLP usually gets you the same liability protection with meaningfully less ongoing compliance.</p>
      <div class="article-callout">Still unsure? Tell us your business model and funding plans on a quick call — we'll recommend the structure that fits, not just the one that's easiest to register.</div>`
    },
    { cat: 'MSME', icon: 'fa-industry', title: 'Udyam Registration Benefits Most MSMEs Never Claim', excerpt: 'From delayed‑payment protection to collateral‑free loans — the benefits hiding inside your Udyam certificate.', date: 'Apr 2026', read: '4 min read',
      article: `
      <p>Udyam (MSME) registration is free and takes minutes online, yet most registered businesses never actually use the protections it comes with. Here's what's available once you're registered:</p>
      <h4>Delayed payment protection</h4>
      <p>Under Sections 15 and 16 of the MSMED Act, a buyer must pay a registered MSME within 45 days of accepting goods/services, or pay compound interest at three times the RBI bank rate on the delayed amount. If a buyer doesn't pay, you can file a claim with the MSME Samadhaan portal for time‑bound resolution — this right doesn't exist without Udyam registration.</p>
      <h4>Collateral‑free credit</h4>
      <p>Registered MSMEs can access collateral‑free loans under the Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) scheme, along with priority‑sector lending status at most banks — generally faster approval and better terms than an unregistered business would get.</p>
      <h4>Other benefits often missed</h4>
      <ul>
        <li>Subsidy (up to 50%) on patent and trademark registration fees</li>
        <li>Preference and relaxed eligibility criteria in government tenders</li>
        <li>Concessional rates on ISO certification reimbursement</li>
        <li>Interest rate concessions on overdraft under some bank schemes</li>
      </ul>
      <div class="article-callout">If you're already registered but have never claimed any of this, it's worth a 10‑minute conversation — most of these benefits are opt‑in, not automatic.</div>`
    },
    { cat: 'Accounting Tips', icon: 'fa-book', title: 'Monthly Bookkeeping Checklist Every Small Business Needs', excerpt: 'A simple month‑end routine that keeps your books audit‑ready all year round.', date: 'Apr 2026', read: '3 min read',
      article: `
      <p>A short, consistent month‑end routine is what separates books that are "ready for the CA" from books that need a week of cleanup before every filing. Here's the checklist we run for clients every month:</p>
      <ol>
        <li><strong>Bank reconciliation</strong> — match every bank transaction against your books; investigate anything unexplained immediately, not at year‑end.</li>
        <li><strong>Purchase register vs GSTR‑2B</strong> — confirm every ITC claim is backed by a supplier invoice actually reflecting in your 2B.</li>
        <li><strong>Sales register vs GSTR‑1</strong> — check outward supplies reported match your books exactly.</li>
        <li><strong>TDS deducted and deposited</strong> — verify challans are paid within the due date to avoid interest under Section 201.</li>
        <li><strong>Expense vouchers filed</strong> — every expense entry should have a supporting bill; missing vouchers are the top reason for disallowed expenses later.</li>
        <li><strong>Debtors/creditors ageing review</strong> — flag overdue receivables early rather than discovering them at year‑end.</li>
        <li><strong>Petty cash reconciliation</strong> — physical cash should match the cash book balance every month, not just when someone remembers to check.</li>
        <li><strong>Backup your records</strong> — cloud or offline, monthly, non‑negotiable.</li>
      </ol>
      <div class="article-callout">Doing this every month turns your annual return and audit into a formality instead of a scramble. If your books have fallen behind, we can help you catch up — message us on WhatsApp.</div>`
    },
  ];
  document.getElementById('blogGrid').innerHTML = posts.map((p, i) => `
    <div class="blog-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 80}" data-post="${i}">
      <div class="blog-thumb"><i class="fa-solid ${p.icon}"></i></div>
      <div class="blog-body">
        <span class="blog-cat">${p.cat}</span>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <div class="blog-meta"><span>${p.date}</span><span>${p.read}</span></div>
        <span class="blog-read">Read Article <i class="fa-solid fa-arrow-right"></i></span>
      </div>
    </div>`).join('');

  /* ---------- BLOG ARTICLE MODAL ---------- */
  const blogModal = document.getElementById('blogModal');
  const blogModalContent = document.getElementById('blogModalContent');
  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', () => {
      const p = posts[parseInt(card.dataset.post, 10)];
      blogModalContent.innerHTML = `
        <button class="modal-close" id="blogModalClose"><i class="fa-solid fa-xmark"></i></button>
        <span class="article-cat"><i class="fa-solid ${p.icon}"></i> ${p.cat}</span>
        <h3>${p.title}</h3>
        <div class="article-meta"><span><i class="fa-solid fa-calendar"></i> ${p.date}</span><span><i class="fa-solid fa-clock"></i> ${p.read}</span></div>
        <div class="article-body">${p.article}</div>
        <div class="article-note">Have a question about this? Our team is one WhatsApp message away.</div>
        <div class="article-cta">
          <a href="https://wa.me/918356050822" target="_blank" class="btn btn-whatsapp"><i class="fa-brands fa-whatsapp"></i> Ask on WhatsApp</a>
        </div>`;
      blogModal.classList.add('open');
      document.getElementById('blogModalClose').addEventListener('click', () => blogModal.classList.remove('open'));
    });
  });
  blogModal.addEventListener('click', (e) => { if (e.target === blogModal) blogModal.classList.remove('open'); });

  /* =========================================================
     FAQ ACCORDION
  ========================================================= */
  const faqs = [
    { q: 'How quickly can I get GST registered?', a: 'For most businesses with clean documentation, GST registration is completed within 3–7 working days of application, entirely online.' },
    { q: 'Do you handle GST notices and departmental hearings?', a: 'Yes. Our team drafts replies to DRC‑01A and show‑cause notices, and represents clients in departmental hearings when required.' },
    { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade your plan anytime — there is no annual lock‑in on any of our plans.' },
    { q: 'What documents do I need for GST registration?', a: 'PAN, Aadhaar, business address proof, bank details and photographs are typically required. We share a checklist specific to your business type.' },
    { q: 'Is my financial data kept confidential?', a: 'Yes. We use encrypted cloud storage with restricted access, and never share client data with third parties.' },
    { q: 'Do you serve clients outside Mumbai?', a: 'Yes — our process is 100% online, so we serve businesses across India, not just Maharashtra.' },
    { q: 'What happens if I miss a filing deadline?', a: 'We send reminders well before every due date. If a deadline is missed, we help minimise late fees and interest and file as soon as possible.' },
  ];
  document.getElementById('faqList').innerHTML = faqs.map((f, i) => `
    <div class="faq-item" data-aos="fade-up">
      <div class="faq-q"><span>${f.q}</span><i class="fa-solid fa-plus"></i></div>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>`).join('');

  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const answer = item.querySelector('.faq-a');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight = null; });
      if (!wasOpen) { item.classList.add('open'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
    });
  });

  /* =========================================================
     CONTACT FORM
  ========================================================= */
  const sendChoiceModal = document.getElementById('sendChoiceModal');
  const sendChoiceModalClose = document.getElementById('sendChoiceModalClose');
  const sendViaEmail = document.getElementById('sendViaEmail');
  const sendViaWhatsapp = document.getElementById('sendViaWhatsapp');
  let pendingContactForm = null;

  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    pendingContactForm = e.target;
    sendChoiceModal.classList.add('open');
  });

  function closeSendChoiceModal(){
    sendChoiceModal.classList.remove('open');
  }
  sendChoiceModalClose.addEventListener('click', closeSendChoiceModal);
  sendChoiceModal.addEventListener('click', (e) => { if (e.target === sendChoiceModal) closeSendChoiceModal(); });

  sendViaEmail.addEventListener('click', () => {
    if (!pendingContactForm) return;
    const f = new FormData(pendingContactForm);
    const body = `Name: ${f.get('name')}\nPhone: ${f.get('phone')}\nEmail: ${f.get('email')}\nService: ${f.get('service')}\nMessage: ${f.get('message') || '-'}`;
    logLeadToSheet({
      name: f.get('name'), phone: f.get('phone'), email: f.get('email'),
      service: f.get('service'), message: f.get('message'), source: 'Contact Form (Email)'
    });
    window.open(`mailto:complifygst@gmail.com?subject=${encodeURIComponent('Website Enquiry from ' + f.get('name'))}&body=${encodeURIComponent(body)}`, '_blank');
    alert('Thank you! Your message is ready to send via email. We will get back to you shortly.');
    closeSendChoiceModal();
    pendingContactForm.reset();
    pendingContactForm = null;
  });

  sendViaWhatsapp.addEventListener('click', () => {
    if (!pendingContactForm) return;
    const f = new FormData(pendingContactForm);
    const text = `Hi ComplifyGST, I'm reaching out from the website.\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nEmail: ${f.get('email')}\nService: ${f.get('service')}\nMessage: ${f.get('message') || '-'}`;
    logLeadToSheet({
      name: f.get('name'), phone: f.get('phone'), email: f.get('email'),
      service: f.get('service'), message: f.get('message'), source: 'Contact Form (WhatsApp)'
    });
    window.open(`https://wa.me/918356050822?text=${encodeURIComponent(text)}`, '_blank');
    closeSendChoiceModal();
    pendingContactForm.reset();
    pendingContactForm = null;
  });

});
