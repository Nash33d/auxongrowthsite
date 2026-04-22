
const token = "skDPfLIWvI0F3pZo1JhQ0lNfx9O6eDe7ELxszlBLJP81qnFP0hPzC1irp2o6G2OKq9oONcDM680Y0svTgnFyOOI8VdpoCBzGQmZizd0QMfJgkqC8JfwF21u5s94VFcR1PNwomQT7Upz3exqlnkSaobIfutKH8916ZVG0Cze1V1h4CfKP5TUF";
const projectId = "qyped6qu";
const dataset = "production";

async function createArticle() {
  const doc = {
    _id: "article-cbd-meta-account-banned",
    _type: "article",
    title: "How to Run CBD Ads on Meta Without Getting Banned",
    slug: { _type: "slug", current: "how-to-run-cbd-ads-on-meta-without-getting-banned" },
    niche: { _type: "reference", _ref: "niche-cbd-delta-hemp" },
    platform: { _type: "reference", _ref: "platform-meta" },
    problem: "Ad Account Bans",
    metaDescription: "Learn the proven framework for running compliant CBD and hemp advertising campaigns on Facebook and Instagram without triggering account bans or ad disapprovals.",
    publishedAt: new Date().toISOString(),
    seoKeywords: [
      "CBD advertising",
      "CBD ads Facebook",
      "hemp advertising Meta",
      "CBD ad account banned",
      "how to advertise CBD on Instagram",
      "CBD Facebook ads compliance"
    ],
    body: [
      {
        _type: "block",
        _key: "intro1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "Running CBD ads on Meta (Facebook & Instagram) is one of the biggest challenges in digital advertising. With constantly shifting policies, automated enforcement, and zero tolerance for violations, most brands either get banned within days or give up entirely.",
            marks: []
          }
        ]
      },
      {
        _type: "block",
        _key: "h2-1",
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: "s2", text: "Why Meta Bans CBD Advertisers", marks: [] }]
      },
      {
        _type: "block",
        _key: "p2",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "Meta\u2019s advertising policies explicitly prohibit the promotion of \u201cunsafe substances,\u201d which their automated systems interpret broadly. CBD, despite being federally legal under the 2018 Farm Bill, still triggers these automated flags because:",
            marks: []
          }
        ]
      },
      {
        _type: "block",
        _key: "p3",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s4",
            text: "\u2022 Landing pages mention \u201ccannabis\u201d or \u201cTHC\u201d (even in disclaimers)\n\u2022 Product imagery resembles marijuana packaging\n\u2022 Health claims trigger pharmaceutical policy violations\n\u2022 Pixel data from previously banned domains carries over",
            marks: []
          }
        ]
      },
      {
        _type: "block",
        _key: "h2-2",
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: "s5", text: "The Auxon Growth Framework for Compliant CBD Ads", marks: [] }]
      },
      {
        _type: "block",
        _key: "p4",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s6",
            text: "At Auxon Growth, we\u2019ve managed over $20M in ad spend across restricted verticals. Here\u2019s our battle-tested approach for CBD brands on Meta:",
            marks: []
          }
        ]
      },
      {
        _type: "block",
        _key: "h3-1",
        style: "h3",
        markDefs: [],
        children: [{ _type: "span", _key: "s7", text: "1. Landing Page Architecture", marks: [] }]
      },
      {
        _type: "block",
        _key: "p5",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s8",
            text: "Your landing page is where 90% of bans originate. We use dedicated, clean landing pages that focus on the lifestyle benefits rather than the compound itself. No mentions of THC, no cannabis leaf imagery, no medical claims.",
            marks: []
          }
        ]
      },
      {
        _type: "block",
        _key: "h3-2",
        style: "h3",
        markDefs: [],
        children: [{ _type: "span", _key: "s9", text: "2. Ad Creative Compliance", marks: [] }]
      },
      {
        _type: "block",
        _key: "p6",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s10",
            text: "Every ad creative goes through our compliance checklist before launch. We focus on wellness positioning, use approved terminology, and avoid any before/after claims that could trigger health policy violations.",
            marks: []
          }
        ]
      },
      {
        _type: "block",
        _key: "h3-3",
        style: "h3",
        markDefs: [],
        children: [{ _type: "span", _key: "s11", text: "3. Account Infrastructure", marks: [] }]
      },
      {
        _type: "block",
        _key: "p7",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s12",
            text: "We structure Business Manager accounts with proper warming protocols, gradual spend scaling, and redundancy layers. This isn\u2019t about \u201ccloaking\u201d \u2014 it\u2019s about building legitimate account health that can withstand Meta\u2019s review processes.",
            marks: []
          }
        ]
      },
      {
        _type: "block",
        _key: "h2-3",
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: "s13", text: "Results We\u2019ve Achieved", marks: [] }]
      },
      {
        _type: "block",
        _key: "p8",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s14",
            text: "Our CBD clients consistently see 1.6x+ ROAS on Meta with account longevity measured in months, not days. The key is compliance-first creative strategy combined with proper infrastructure.",
            marks: []
          }
        ]
      },
      {
        _type: "block",
        _key: "h2-4",
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: "s15", text: "Ready to Scale Your CBD Brand?", marks: [] }]
      },
      {
        _type: "block",
        _key: "p9",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "s16",
            text: "Stop burning through ad accounts and agency retainers. Auxon Growth specializes in keeping CBD brands profitable on Meta, Google, and native platforms. Book a call to discuss your specific situation.",
            marks: []
          }
        ]
      }
    ]
  };

  const mutations = [{ createOrReplace: doc }];
  const res = await fetch(
    `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mutations }),
    }
  );
  const data = await res.json();
  console.log("Article created:", JSON.stringify(data, null, 2));
}

createArticle().catch(console.error);
