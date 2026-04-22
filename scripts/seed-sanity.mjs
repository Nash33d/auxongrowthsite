
const token = process.env.SANITY_API_TOKEN || "skDPfLIWvI0F3pZo1JhQ0lNfx9O6eDe7ELxszlBLJP81qnFP0hPzC1irp2o6G2OKq9oONcDM680Y0svTgnFyOOI8VdpoCBzGQmZizd0QMfJgkqC8JfwF21u5s94VFcR1PNwomQT7Upz3exqlnkSaobIfutKH8916ZVG0Cze1V1h4CfKP5TUF";
const projectId = "qyped6qu";
const dataset = "production";

const niches = [
  { name: "CBD / Delta / Hemp", slug: "cbd-delta-hemp", description: "Advertising strategies for CBD, Delta-8/9, and hemp-derived products across restricted platforms." },
  { name: "Telehealth / Medical", slug: "telehealth-medical", description: "Patient acquisition and ad compliance for telemedicine, exosomes, stem cell, and medical services." },
  { name: "Nutraceuticals / Weight Loss", slug: "nutraceuticals-weight-loss", description: "Performance marketing for supplements, weight loss products, and health optimization brands." },
  { name: "Financial / Crypto", slug: "financial-crypto", description: "Lead generation and compliance frameworks for financial services, cryptocurrency, and fintech." },
  { name: "iGaming / Gambling", slug: "igaming-gambling", description: "User acquisition strategies for online casinos, sports betting, and real-money gaming platforms." },
];

const platforms = [
  { name: "Meta Ads", slug: "meta", description: "Facebook & Instagram advertising" },
  { name: "Google Ads", slug: "google", description: "Search, Display, YouTube, and Performance Max campaigns" },
  { name: "TikTok Ads", slug: "tiktok", description: "TikTok advertising and creator partnerships" },
  { name: "Taboola", slug: "taboola", description: "Native advertising on premium publisher sites" },
  { name: "Outbrain", slug: "outbrain", description: "Content discovery and native ad placements" },
  { name: "X (Twitter)", slug: "x-twitter", description: "Advertising on X/Twitter platform" },
];

async function createDoc(doc) {
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
  if (!res.ok) {
    console.error("Error:", JSON.stringify(data));
  }
  return data;
}

async function seed() {
  console.log("Seeding niches...");
  for (const n of niches) {
    const doc = {
      _id: `niche-${n.slug}`,
      _type: "niche",
      name: n.name,
      slug: { _type: "slug", current: n.slug },
      description: n.description,
    };
    const result = await createDoc(doc);
    console.log(`  ✓ ${n.name}`, result.results?.[0]?.id || "");
  }

  console.log("Seeding platforms...");
  for (const p of platforms) {
    const doc = {
      _id: `platform-${p.slug}`,
      _type: "platform",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      description: p.description,
    };
    const result = await createDoc(doc);
    console.log(`  ✓ ${p.name}`, result.results?.[0]?.id || "");
  }

  console.log("\nDone! Niches and platforms seeded.");
}

seed().catch(console.error);
