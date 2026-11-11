export const en = {
  sponsors: {
    title: "Sponsorship Opportunities",
    subtitle:
      "Position your brand at the forefront of Saudi Arabia's healthcare transformation.",
    inquireNow: "Inquire Now",
    tiers: [
      {
        id: "strategic",
        name: "Strategic Sponsor (500,000 SAR)",
        description:
          "Comprehensive sponsorship featuring a 10×10m booth, 10M view campaign, opening ceremony keynote speech, and official press conference.",
        price: "500,000",
        currency: "SAR",
        featured: true,
        perks: [
          "10×10m booth space inside the exhibition hall",
          "Logo placement on all organizers' apparel & print materials (4×5 size)",
          "Social media campaign targeting 10 Million views",
          "Official keynote speech at opening ceremony & press conference",
          "Dedicated TV feature report and sponsor promo video",
          "Sponsor mention by prominent influencers and celebrities",
          "Official invitation and special acknowledgment from organizers",
        ],
        stats: [
          { value: "10×10m", label: "Booth space area" },
          { value: "10M+", label: "Campaign targeted views" },
          { value: "4×5", label: "Logo display size" },
        ],
      },
      {
        id: "diamond",
        name: "The Diamond Sponsor (350,000 SAR)",
        description:
          "Elite sponsorship featuring an 8×10m booth, 10M view campaign with 3×4 logo sizing, TV report, and promotion via 4 major influencers.",
        price: "350,000",
        currency: "SAR",
        featured: false,
        perks: [
          "8×10m booth space inside the exhibition hall",
          "Social media campaign targeting 10 Million views (3×4 logo size)",
          "3×4 logo sizing across print media, promo videos & website news",
          "TV feature report and press conference backdrop feature",
          "Sponsor mention by 4 key influencers at the exhibition",
          "Official invitation and special acknowledgment from organizers",
        ],
        stats: [
          { value: "8×10m", label: "Booth space area" },
          { value: "10M+", label: "Campaign targeted views" },
          { value: "4", label: "Key influencers" },
        ],
      },
      {
        id: "golden",
        name: "Golden Sponsor (200,000 SAR)",
        description:
          "Strong presence featuring a 9×6m booth (54 sqm), 2×3 logo highlight across prints, opening promo, and 10M view digital campaign.",
        price: "200,000",
        currency: "SAR",
        featured: false,
        perks: [
          "9×6m booth space inside the exhibition hall",
          "Social media campaign targeting 10 Million views (2×3 logo size)",
          "2×3 logo display on print materials & digital newspaper ads",
          "Logo inclusion in opening promo, backdrop & website news",
          "TV report coverage and mention by attending influencers",
          "Official invitation and acknowledgment from organizers",
        ],
        stats: [
          { value: "9×6m", label: "Booth space (54 sqm)" },
          { value: "10M+", label: "Campaign targeted views" },
          { value: "2×3", label: "Logo display size" },
        ],
      },
      {
        id: "participating",
        name: "Participating Sponsor (50,000 SAR)",
        description:
          "Essential package featuring a 3×4m booth (12 sqm), 1×2 logo placement, digital newspaper ads, TV report, and official forum access.",
        price: "50,000",
        currency: "SAR",
        featured: false,
        perks: [
          "3×4m booth space inside the forum hall",
          "Social media campaign targeting 10 Million views (1×2 logo size)",
          "1×2 logo display on prints, digital newspapers & website",
          "Inclusion in opening promo video, backdrop banner & TV report",
          "Personal invitation pass and official institutional recognition",
        ],
        stats: [
          { value: "3×4m", label: "Booth space (12 sqm)" },
          { value: "10M+", label: "Campaign targeted views" },
          { value: "1×2", label: "Logo display size" },
        ],
      },
    ],
  },
};

export type SponsorsDictionary = typeof en;
