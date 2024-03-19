export interface CatalogFallback {
  node: CatalogFallbackNode;
}

export interface CatalogFallbackNode {
  id: string;
  name: string;
  productImages: {
    edges: { node: { url: string } }[];
  };
  metadata: {
    userGuideUrl: string | null;
    quickStartUrl: string;
  } | null;
}

/* eslint-disable unicorn/no-null */
/* eslint-disable sonarjs/no-duplicate-string */
// alias names for lookups, TEMPORARY solution from https://hp-jira.external.hp.com/browse/LENS-18282
// left side is given name, right side is product catalog name
export const catalogAliasTable: Record<string, string> = {
  'Poly VSurround 80': 'Voyager Surround 80',
  'Poly VSurround 85': 'Voyager Surround 85',
  'Poly VFree 60 Series': 'Voyager Free 60 Series',
};

/* eslint-disable unicorn/no-null */
/* eslint-disable sonarjs/no-duplicate-string */
// Product catalog data. This is a TEMPORARY solution from LENS-18588, until
// https://hp-jira.external.hp.com/browse/LENS-18333 and
// https://hp-jira.external.hp.com/browse/LENS-18238 are completed.
// This file was generated 1-31-24 using this query:
// https://api.silica-prod01.io.lens.poly.com/graphql?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMICGKZANhAOYAKeEYMUKAzgBQAkADmXjJx26UhWp1GzVihIQkSBGwCW8%2BgKHsAlEWAAdPHqREiUcTQZMWbLv0HDRfDcJ37Dxk0QRhaCdroMjT08kZgQA92Dg5TBAjyiiJCEEOISTXisZAEk4Ml9-NyC0k298iKLik1CwcML4ypMYPCpUhqIAX1bizsi0noqoxEowcXL6hJh2fABxGBiEAFVmrrScZSgAawBlSjwUJZbehP7xjpWTkxP2kAAaEAA3AWUyACMqPwwQOpM9EDtNX6ib6eX5UZRwZQoQFEADMAAY4a0riB2kA
export const catalogFallbackData: CatalogFallback[] = [
  {
    node: {
      id: '113',
      name: 'Voyager Legend US',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_legend_legacy.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9135917_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9135917_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '114',
      name: 'Voyager Legend US Verizon',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_legend_legacy.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9135917_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9135917_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '115',
      name: 'Voyager Legend ROW',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_legend_legacy.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9135917_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9135917_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '122',
      name: 'Voyager Legend Mandarin',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_legend_legacy.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9135917_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9135917_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '123',
      name: 'Voyager Legend Swedish',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_legend_legacy.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9135917_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9135917_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '127',
      name: 'Voyager Focus UC',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_focus_uc_front_boom_up.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9539671_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9539185_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '130',
      name: 'Voyager 5200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_5200.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538140_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9537994_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '132',
      name: 'Voyager 5200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_5200.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538140_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9537994_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '133',
      name: 'Voyager 5200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_5200.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538140_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538140_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '134',
      name: 'Voyager 5200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_5200.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538140_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9537994_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '135',
      name: 'Voyager 5200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_5200.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538140_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9537994_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '146',
      name: 'Voyager 6200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_6200_uc_black_1.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538271_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538169_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '147',
      name: 'Voyager 8200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_8200_uc.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538712_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538425_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '14c',
      name: 'Calisto 3200',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/calisto_3200.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9620553_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9620563_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '14d',
      name: 'Voyager 4220 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_4220.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9574514_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9600677_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '14e',
      name: 'Voyager 4210 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_4210.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9574514_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9600677_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '151',
      name: 'Voyager 8200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_8200_uc.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538712_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538425_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '152',
      name: 'Voyager 6200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_6200_uc_black_1.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538271_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538169_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '154',
      name: 'Voyager Focus 2 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_focus_2.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9541557_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9541548_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '155',
      name: 'Calisto 3200-M',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/calisto_3200_teams.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9620553_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9620563_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '156',
      name: 'Voyager 4220 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_4220.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9574514_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9600677_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '157',
      name: 'Voyager 4210 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_4210.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9574514_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9600677_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '158',
      name: 'Voyager 4240 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_4245.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9574923_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9486758_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '159',
      name: 'Voyager 6200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_6200_uc_black_1.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538271_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538169_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '15a',
      name: 'Calisto 5300-M',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/calisto_5300_teams.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8829904_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9620571_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '15b',
      name: 'Calisto 5300',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/calisto_5300.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8829904_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9620571_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '15c',
      name: 'Sync 20',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/sync_20.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8830237_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452960_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '15d',
      name: 'Sync 20-M',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/sync_20_m.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8830237_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452960_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '15e',
      name: 'Sync 40',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/sync_40.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8830533_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9600334_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '15f',
      name: 'Sync 40-M',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/sync_40_m.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8830533_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9600334_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '160',
      name: 'Sync 60',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/sync_60.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8829757_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9600359_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '161',
      name: 'Sync 60-M',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/sync_60_m.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8829757_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9600359_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '162',
      name: 'Voyager Focus 2 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_focus_2.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9541557_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9541548_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '163',
      name: 'Sync 20',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/sync_20.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8830237_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452960_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '164',
      name: 'Sync 20-M',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/sync_20_m.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8830237_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452960_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '165',
      name: 'Sync 40',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/sync_40.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8830533_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9600334_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '166',
      name: 'Sync 40-M',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/sync_40_m.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8830533_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9600334_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '167',
      name: 'Voyager 4320 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_4320.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9486805_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594590_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '168',
      name: 'Voyager 4320 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_4320.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9486805_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594590_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '169',
      name: 'Voyager 4320 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_4320.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9486805_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594590_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '16a',
      name: 'Voyager 4310 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_4310.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9486805_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594590_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '16b',
      name: 'Voyager 4310 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_4310.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9486805_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594590_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '16c',
      name: 'Voyager 4310 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_4310.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9486805_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594590_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '16d',
      name: 'Sync 20',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/sync_20.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8830237_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452960_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '16e',
      name: 'Voyager Surround 80',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_surround_80.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9438892_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9438888_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '171',
      name: 'Sync 10',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/sync_10.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8829999_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9483672_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '172',
      name: 'Voyager Free 60+ Charge Case',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60+_case_carbon.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60+_case_white.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60+_case_screen_carbon.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60+_case_screen_white.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60+_angle_carbon_usb_a.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60+_angle_white_usb_c.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60+_floating_earbud_carbon_usb_c.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60+_floating_earbud_carbon_usb_a.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60+_floating_earbud_white_usb_c.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60+_floating_earbud_white_usb_a.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9483599_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9483580_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '17c',
      name: 'Voyager Surround 85',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/vs85_right.png' },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_surround_85.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/vs85_stand_right_teams_2x.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9284562_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9438884_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '205',
      name: 'Meeting Owl Pro',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/meeting_owl_pro.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: '2e6',
      name: 'BT 700',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/bt700_usb_a.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9497399_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9497395_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '2e7',
      name: 'BT 700',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/bt700_usb_a.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9497399_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9497395_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '2e8',
      name: 'BT 700',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/bt700_usb_a.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9497399_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9497395_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '2e9',
      name: 'BT 700',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/bt700_usb_a.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9497399_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9497395_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '2ea',
      name: 'Voyager Base-M CD',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_office_base_teams.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: '2eb',
      name: 'Voyager Base D',
      productImages: { edges: [] },
      metadata: null,
    },
  },
  {
    node: {
      id: '2ec',
      name: 'Voyager Base CD',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_office_base.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: '2ed',
      name: 'BT 600',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/bt600.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127197_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127149_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '2ee',
      name: 'BT 600',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/bt600.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127197_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127149_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '2ef',
      name: 'BT 600',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/bt600.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127197_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127149_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '2f6',
      name: 'BT 600',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/bt600.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127197_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127149_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '2f7',
      name: 'BT 600',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/bt600.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127197_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127149_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '2fa',
      name: 'BT 600',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/bt600.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127197_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127149_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '2fb',
      name: 'BT 600',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/bt600.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127197_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127149_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '2fc',
      name: 'BT 600',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/bt600.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127197_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9127149_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '3001',
      name: 'EagleEye Mini',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/eagleeyemini_02.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl: 'https://www.poly.com/support/eagleeye-mini',
        quickStartUrl: 'https://www.poly.com/support/eagleeye-mini',
      },
    },
  },
  {
    node: {
      id: '417',
      name: 'BT 300C',
      productImages: { edges: [] },
      metadata: null,
    },
  },
  {
    node: {
      id: '4302',
      name: 'MDA526 QD',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/mda500.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9453007_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452998_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '4303',
      name: 'MDA524 QD',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/mda500.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9453007_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452998_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '4304',
      name: 'Blackwire 7225',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_7225.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428555_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428549_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '430a',
      name: 'Blackwire 3320',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3320_usb_a.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3320.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428473_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428467_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '430b',
      name: 'Blackwire 3310',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3310.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428473_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428467_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '430c',
      name: 'Blackwire 3325 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3325.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428473_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428467_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '430d',
      name: 'Blackwire 3315',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3315.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428473_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428467_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '430e',
      name: 'EncorePro 320 USB',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/encore_pro_320_usb_c.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8722190_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452973_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '430f',
      name: 'EncorePro 310 USB',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/encore_pro_310_usb_c.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8722190_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452973_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '4311',
      name: 'Blackwire 3320',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3320_usb_a.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3320.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428473_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428467_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '4312',
      name: 'Blackwire 3310',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3310.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428473_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428467_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '4313',
      name: 'Blackwire 3325 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3325.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428473_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428467_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '4314',
      name: 'Blackwire 3315',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3315.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428473_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428467_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '4315',
      name: 'Blackwire 8225',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_8225.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452926_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452935_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '4317',
      name: 'Blackwire 8225-M Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_8225_teams_usb_a.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452926_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452935_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '431a',
      name: 'Poly Studio P21',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/p21.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8708481_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9575986_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '431b',
      name: 'DA75',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/da75.png' } },
        ],
      },
      metadata: {
        userGuideUrl: 'https://www.poly.com/support/da-series',
        quickStartUrl: 'https://www.poly.com/support/da-series',
      },
    },
  },
  {
    node: {
      id: '431c',
      name: 'DA85',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/da85.png' } },
        ],
      },
      metadata: {
        userGuideUrl: 'https://www.poly.com/support/da-series',
        quickStartUrl: 'https://www.poly.com/support/da-series',
      },
    },
  },
  {
    node: {
      id: '431d',
      name: 'EncorePro 515 USB',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/encorepro_515.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9453011_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452965_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '431e',
      name: 'EncorePro 525 USB',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/encorepro_525.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9453011_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452965_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '431f',
      name: 'EncorePro 545 USB',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/encorepro_545.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9453011_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452965_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '4320',
      name: 'Poly Studio P21',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/p21.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8708481_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9575986_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '59e',
      name: 'HyperX Vision S',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/hyperx_vision_s.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: '654a',
      name: 'HP 320/325 Webcam',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/hp_320_fhd_webcam.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: '714a',
      name: 'HP 620/625 Webcam',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/hp_620_fhd_webcam.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://support.hp.com/hk-en/product/hp-620-fhd-webcam/2101461723/how-to',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9193734_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '760',
      name: 'HP 960/965 Webcam',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/hp_4k_silver.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://support.hp.com/us-en/product/hp-960-4k-streaming-webcam/2101285027/how-to',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9193759_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '794a',
      name: 'HP 430/435 Webcam',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/hp_435_fhd_webcam.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://support.hp.com/us-en/product/setup-user-guides/hp-430-fhd-webcam/2101572158',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9163456_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '8201',
      name: 'Dell BT100',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/dell_bt100.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: '8202',
      name: 'Dell BT100',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/dell_bt100.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: '8203',
      name: 'Dell BT100',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/dell_bt100.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: '884',
      name: 'HP Presence See',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/hp_presence_see.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: '9120',
      name: 'Poly Trio 8800',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/trio8800.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: '9160',
      name: 'GC8',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/gc8.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: '9204',
      name: 'EagleEye IV USB',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/eagleeye_iv_usb.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl: null,
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9122736_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '9206',
      name: 'EagleEye Director II',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/eagleeye_director_ii.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8107036_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8107036_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '9212',
      name: 'EagleEye Cube',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/eagleeye_cube_camera_flap_open_left_print_rgb.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9120919_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9120919_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '9217',
      name: 'Poly Studio USB',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/studio.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9120423_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9120423_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '9270',
      name: 'Poly Trio C60',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/trio_c60.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: '9290',
      name: 'Poly Studio P15',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/p15.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9121160_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9575935_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '9294',
      name: 'Studio E60',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/studio_e60.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: '9296',
      name: 'Poly Studio P5',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/p5.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9120500_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9575922_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '92a1',
      name: 'Studio E70',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/studio_e70.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl: null,
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9121024_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: '92b2',
      name: 'Studio R30',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/studior30.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9122100_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9575644_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'a511',
      name: 'Dell Premier Wireless ANC Headset WL7022',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/dell_wl7022.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://dl.dell.com/content/manual18405852-dell-premier-wireless-anc-headset-wl7022-user-guide.pdf',
        quickStartUrl:
          'https://downloads.dell.com/manuals/all-products/esuprt_electronics_accessories/esuprt_electronics_accessories_audio/dell-premier-wrl-hdst-wl7022_setup-guide_en-us.pdf',
      },
    },
  },
  {
    node: {
      id: 'a512',
      name: 'Dell Pro Wireless Headset WL5022',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/dell_wl5022.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://dl.dell.com/content/manual42446890-dell-pro-wireless-headset-wl5022-user-s-guide.pdf',
        quickStartUrl:
          'https://downloads.dell.com/manuals/all-products/esuprt_electronics_accessories/esuprt_electronics_accessories_audio/dell-pro-wireless-headset-wl5022_setup-guide_en-us.pdf',
      },
    },
  },
  {
    node: {
      id: 'a513',
      name: 'Dell Pro Stereo Headset WH3022',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/dell_wh3022.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://dl.dell.com/content/manual18251313-dell-pro-stereo-headset-wh3022-user-guide.pdf',
        quickStartUrl:
          'https://downloads.dell.com/manuals/all-products/esuprt_electronics_accessories/esuprt_electronics_accessories_audio/pro-stereoheadset-wh3022_setup-guide_en-us.pdf',
      },
    },
  },
  {
    node: {
      id: 'ab03',
      name: 'Savi 8200 UC Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_8220_uc_base.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510800_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594554_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ab04',
      name: 'Savi 8200 UC Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_8220_uc_base.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510800_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594554_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ab05',
      name: 'Savi 8200 UC Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_8220_uc_base.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510800_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594554_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ab06',
      name: 'Savi 7310 Series',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/savi_7310.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510708_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510148_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ab07',
      name: 'Savi 7320 Series',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/savi_7320.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510708_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510148_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ab08',
      name: 'D400',
      productImages: { edges: [] },
      metadata: null,
    },
  },
  {
    node: {
      id: 'ab09',
      name: 'Savi 8210 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/yen_mono_headset_savi8210_savi8410.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510800_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594554_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ab0a',
      name: 'Savi 8220 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/yen_stereo_headset_savi8220_savi8420.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510800_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594554_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ac01',
      name: 'Savi 700 Series',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/savi_8240.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651227_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651227_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ac11',
      name: 'Savi 700-M Series',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/savi_8240.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651232_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651232_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ac20',
      name: 'Savi 8200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_8220_office_base.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510800_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594554_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ac21',
      name: 'Savi Office Base CDM',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_7310_base_teams.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510682_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594478_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ac22',
      name: 'Savi 8200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_8220_office_base.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510800_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594554_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ac24',
      name: 'Savi Office Base CD',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/savi_745_m.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510682_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594478_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ac27',
      name: 'Savi 7310 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_7310_office_base.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510708_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510148_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ac28',
      name: 'Savi 7320 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_7310_office_base.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510708_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510148_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ac29',
      name: 'Savi 8200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_8220_office_base.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://www.poly.com/content/dam/www/products/headsets/savi/savi-8200/doc/savi-8210-8220-uc-ug-en.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510515_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ac2a',
      name: 'Savi Office Base CDM',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_7310_base_teams.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510682_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594478_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ac2b',
      name: 'Savi 8200 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_8220_office_base.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510800_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594554_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ac34',
      name: 'Savi 7410 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_7410_office_base.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'ac35',
      name: 'Savi 7420 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_7420_office_base.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'ac37',
      name: 'Savi 8410 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_8410_office_base.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'ac38',
      name: 'Savi 8420 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/savi_8420_office_base.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'acfc',
      name: 'Savi 7310 Series',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/savi_7310.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510708_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510148_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'acfd',
      name: 'Savi 7320 Series',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/savi_7320.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510708_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510148_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'acfe',
      name: 'Savi 8210 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/yen_mono_headset_savi8210_savi8410.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510800_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594554_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'acff',
      name: 'Savi 8220 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/yen_stereo_headset_savi8220_savi8420.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510800_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594554_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ad04',
      name: 'MDA220',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/mda220.png' } },
        ],
      },
      metadata: {
        userGuideUrl: 'https://www.plantronics.com/product/?pid=AD04',
        quickStartUrl: 'https://www.plantronics.com/product/?pid=AD04',
      },
    },
  },
  {
    node: {
      id: 'ad05',
      name: 'MDA400',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/mda400.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452994_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452990_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ae01',
      name: 'Calisto P240-M',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/calisto_240_black.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl: null,
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651778_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ae04',
      name: 'Calisto 240',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/calisto_240_white.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl: null,
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651778_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ae11',
      name: 'Calisto P240',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/calisto_240_black.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl: null,
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651778_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'af00',
      name: 'DA70',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/da70.png' } },
        ],
      },
      metadata: {
        userGuideUrl: 'https://www.poly.com/support/da-series',
        quickStartUrl: 'https://www.poly.com/support/da-series',
      },
    },
  },
  {
    node: {
      id: 'af01',
      name: 'DA80',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/da80.png' } },
        ],
      },
      metadata: {
        userGuideUrl: 'https://www.poly.com/support/da-series',
        quickStartUrl: 'https://www.poly.com/support/da-series',
      },
    },
  },
  {
    node: {
      id: 'af02',
      name: 'DA90',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/da90.png' } },
        ],
      },
      metadata: {
        userGuideUrl: 'https://www.poly.com/support/da-series',
        quickStartUrl: 'https://www.poly.com/support/da-series',
      },
    },
  },
  {
    node: {
      id: 'af03',
      name: 'Plantronics EncorePro 515 USB',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/plantronics_encorepro_515_usb.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9453011_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452965_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'af04',
      name: 'Plantronics EncorePro 525 USB',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/plantronics_encorepro_525_usb.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9453011_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452965_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'af05',
      name: 'Plantronics EncorePro 545 USB',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/plantronics_encorepro_545_usb.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9453011_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452965_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'af06',
      name: 'EncorePro 715 USB',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/encorepro_710.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452986_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452986_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'af07',
      name: 'EncorePro 725 USB',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/encorepro_720.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452986_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452986_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'af08',
      name: 'APU-75',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/apu_75.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651521_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651521_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'af09',
      name: 'Plantronics EncorePro 535 USB',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/encorepro_535.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9453011_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9452973_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'af0b',
      name: 'APU-76',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/apu_76.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651506_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651506_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'af0c',
      name: 'APU-75D',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/apu_75.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651521_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651521_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'af0d',
      name: 'APU-76D',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/apu_76.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651506_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651506_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'af0e',
      name: 'DA70',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/da70.png' } },
        ],
      },
      metadata: {
        userGuideUrl: 'https://www.poly.com/support/da-series',
        quickStartUrl: 'https://www.poly.com/support/da-series',
      },
    },
  },
  {
    node: {
      id: 'b014',
      name: 'Savi 8240 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/x40_headset_savi824x_savi844x.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9486948_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510822_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'b018',
      name: 'Savi 7210 Series',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/savi_7210.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510682_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594478_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'b019',
      name: 'Savi 7220 Series',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/savi_7220.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9510682_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9594478_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'b01a',
      name: 'Voyager Free 60 Series',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60_earbud_left_carbon.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60_earbud_left_white.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60_earbud_right_carbon.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60_earbud_right_white.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60_earbud_pair_carbon.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60_earbud_pair_white.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60_single_earbud_black.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60_single_earbud_white.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9483640_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9483636_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'b024',
      name: 'Voyager Free 20 Earbuds',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_20_series_earbud_left_black.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_20_series_earbud_pair_black.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_20_series_earbud_right_black.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_20_series_earbud_left_silver.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_20_series_earbud_pair_silver.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_20_series_earbud_right_silver.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_20_series_earbud_left_red.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_20_series_earbud_pair_red.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_20_series_earbud_right_red.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'b032',
      name: 'Yealink MTouch II',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/yealink_mtouch_ii.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'b043',
      name: 'Yealink MSpeech',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/yealink_mspeech.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'b050',
      name: 'Yealink UVC86',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/yealink_uvc86.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Bluetooth Remote',
      name: 'Poly Bluetooth Remote',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/bluetooth_remote_nodialpad.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'C026',
      name: 'Blackwire 315',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_c315.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl: null,
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651291_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'C04A',
      name: 'Blackwire 315',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_c315.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl: null,
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651291_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'c053',
      name: 'Blackwire 5220',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_5220.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428538_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428533_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'c054',
      name: 'Blackwire 5210',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_5210.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428538_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428533_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'c055',
      name: 'Blackwire 3210',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3210.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl: null,
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428467_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'c056',
      name: 'Blackwire 3220',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3220_usb_a.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl: null,
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428467_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'c057',
      name: 'Blackwire 3215',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3215.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl: null,
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428467_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'c058',
      name: 'Blackwire 3225',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/blackwire_3225_usb_a.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl: null,
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9428467_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'ca03',
      name: 'Calisto 620',
      productImages: { edges: [] },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651403_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9651403_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'CCX 350',
      name: 'CCX 350',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/ccx350.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'CCX 400',
      name: 'CCX 400',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/ccx400.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'CCX 500',
      name: 'CCX 500',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/ccx500.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'CCX 505',
      name: 'CCX 505',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/ccx505.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'CCX 600',
      name: 'CCX 600',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/ccx600.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'CCX 700',
      name: 'CCX 700',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/ccx700.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'd006',
      name: 'Voyager Free 60 Charge Case',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60_case_carbon.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60_case_white.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60_series_tern_with_single_earbud_out_black.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_60_series_tern_with_single_earbud_out_white.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9483640_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9483636_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'd007',
      name: 'Wireless Charge Stand',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/vs85_stand_only_right_2x.png',
            },
          },
          {
            node: { url: 'https://static.lens.poly.com/images/lark_stand.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'd008',
      name: 'Voyager 5200 Charge Case',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_5200_case.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9538140_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9537994_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'd009',
      name: 'Voyager Free 20 Charge Case',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_20_charge_case_silver.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_20_charge_case_black.png',
            },
          },
          {
            node: {
              url: 'https://static.lens.poly.com/images/voyager_free_20_charge_case_red.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'dell01',
      name: 'Dell Optiplex Room PC',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/dell_optiplex.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Dell Inc.-0KHVV7',
      name: 'Dell Optiplex Room PC',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/dell_optiplex.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'displaylink-manager-mac',
      name: 'displaylink manager mac',
      productImages: { edges: [] },
      metadata: null,
    },
  },
  {
    node: {
      id: 'displaylink-manager-windows',
      name: 'displaylink manager windows',
      productImages: { edges: [] },
      metadata: null,
    },
  },
  {
    node: {
      id: 'E70 Audio Service',
      name: 'Audio Service',
      productImages: { edges: [] },
      metadata: null,
    },
  },
  {
    node: {
      id: 'EagleEye Acoustic Camera',
      name: 'EagleEye Acoustic Camera',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/ee_acoustic_camera.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'EagleEye Cube',
      name: 'EagleEye Cube',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/eagleeye_cube_camera_flap_open_left_print_rgb.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9120919_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9120919_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'EagleEye IV',
      name: 'EagleEye IV',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/eagleeye_iv.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl: null,
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9122736_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'EagleEye IV USB',
      name: 'EagleEye IV USB',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/eagleeye_iv_usb.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl: null,
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9122736_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'EagleEye Producer',
      name: 'EagleEye Producer',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/eagleeye_producer.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8674480_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8674480_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'Edge B10',
      name: 'Edge B10',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/edge_b10_b20.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Edge B20',
      name: 'Edge B20',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/edge_b10_b20.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Edge B30',
      name: 'Edge B30',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/edge_b30.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Edge E100',
      name: 'Edge E100',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/edge_e100.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Edge E220',
      name: 'Edge E220',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/edge_e220.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Edge E300',
      name: 'Edge E300',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/edge_e300.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Edge E320',
      name: 'Edge E320',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/edge_e300.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Edge E350',
      name: 'Edge E350',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/edge_e300.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Edge E400',
      name: 'Edge E400',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/edge_e400.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Edge E450',
      name: 'Edge E450',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/edge_e400.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Edge E500',
      name: 'Edge E500',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/edge_e500.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Edge E550',
      name: 'Edge E550',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/edge_e500.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'EEDII',
      name: 'EagleEye Director II',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/eagleeye_director_ii.png',
            },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8107036_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_8107036_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'EM',
      name: 'VVX Expanision Module',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx_em.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'ff13',
      name: 'Logitech Tap Controller',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/logitech_tap_controller.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'G 7500',
      name: 'G 7500 Video Endpoint',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/g7500.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Group 310',
      name: 'Group 310',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/group310.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Group 500',
      name: 'Group 500',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/group500.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Group 700',
      name: 'Group 700',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/group700.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'HP Console Control',
      name: 'HP Console Control',
      productImages: { edges: [] },
      metadata: null,
    },
  },
  {
    node: {
      id: 'hp-presence-control',
      name: 'HP Presence Control',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/hp_elite_mini.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'IP Table Microphone',
      name: 'IP Table Microphone',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/expansion_mic_1.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'lenovo01',
      name: 'Lenovo ThinkSmart Room PC',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/lenovo_thinksmart_core.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'LENOVO-3136',
      name: 'Lenovo ThinkCentre M920q',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/lenovo_thinksmart_core.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'LENOVO-32F2',
      name: 'Lenovo ThinkSmart Core',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/lenovo_thinksmart_core.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'lens-desktop-mac',
      name: 'Lens Desktop Mac',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/lens_desktop_app.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'lens-desktop-windows',
      name: 'Lens Desktop Windows',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/lens_desktop_app.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'lens-mobile-android',
      name: 'Lens Mobile Android',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/qr_code.png' } },
          {
            node: {
              url: 'https://static.lens.poly.com/images/lens_mobile_app.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'lens-mobile-ios',
      name: 'Lens Mobile iOS',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/qr_code.png' } },
          {
            node: {
              url: 'https://static.lens.poly.com/images/lens_mobile_app.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'lens-pwa',
      name: 'Lens PWA',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/lens_desktop_app.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'lens-relay-image-ova',
      name: 'Poly Lens Relay',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/lens_relay_windows.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'lens-relay-image-vhd',
      name: 'Poly Lens Relay',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/lens_relay_windows.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'lens-relay-linux',
      name: 'Poly Lens Relay',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/lens_relay_windows.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'lens-relay-windows',
      name: 'Poly Lens Relay',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/lens_relay_windows.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'MCore',
      name: 'Yealink MCore',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/yealink_mcore_minipc.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'MTR',
      name: 'Microsoft Teams Room',
      productImages: { edges: [] },
      metadata: null,
    },
  },
  {
    node: {
      id: 'NUC11TNKi5',
      name: 'Intel NUC11 i5',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/logitech_nuc.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Poly Camera Control App',
      name: 'Camera Control',
      productImages: { edges: [] },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Poly Ceiling Microphone',
      name: 'Poly Ceiling Microphone',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/ceiling_mic.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Poly Expansion Microphone',
      name: 'Poly Expansion Microphone',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/expansion_mic.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Poly Microphone IP Adapter',
      name: 'Poly Microphone IP Adapter',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/microphone_ip_adapter.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Poly PC Audio Connector',
      name: 'PC Audio Connector',
      productImages: { edges: [] },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Poly Trio C60 Expansion Microphone',
      name: 'Poly Trio C60 Expansion Microphone',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/trio_c60_expansion_mic.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Poly Virtual USB',
      name: 'Virtual USB',
      productImages: { edges: [] },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Studio R30',
      name: 'Studio R30',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/studior30.png' },
          },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9122100_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9575644_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'Studio USB',
      name: 'Poly Studio USB',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/studio.png' } },
        ],
      },
      metadata: {
        userGuideUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9121582_en-US-1.pdf',
        quickStartUrl:
          'https://kaas.hpcloud.hp.com/pdf-public/pdf_9121582_en-US-1.pdf',
      },
    },
  },
  {
    node: {
      id: 'Studio X30',
      name: 'Poly Studio X30',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/studiox30.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Studio X50',
      name: 'Poly Studio X50',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/studiox50.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Studio X52',
      name: 'Poly Studio X52',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/polystudiox52.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Studio X70',
      name: 'Poly Studio X70',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/studiox70.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'TC10',
      name: 'TC10',
      productImages: {
        edges: [
          {
            node: {
              url: 'https://static.lens.poly.com/images/tc10_black_right_poly_ui_trans_rgb.png',
            },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'TC8',
      name: 'TC8',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/tc8.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Trio 8300',
      name: 'Poly Trio 8300',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/trio8300.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Trio 8500',
      name: 'Poly Trio 8500',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/trio8500.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Trio 8800',
      name: 'Poly Trio 8800',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/trio8800.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Trio C60',
      name: 'Poly Trio C60',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/trio_c60.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Trio Visual+',
      name: 'Trio Visual+',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/visual+.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Trio VisualPro',
      name: 'Trio VisualPro',
      productImages: {
        edges: [
          {
            node: { url: 'https://static.lens.poly.com/images/visualpro.png' },
          },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 101',
      name: 'Poly VVX 101',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx101.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 150',
      name: 'Poly VVX 150',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx150.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 1500',
      name: 'Poly VVX 1500',
      productImages: { edges: [] },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 201',
      name: 'Poly VVX 201',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx201.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 250',
      name: 'Poly VVX 250',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx250.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 300',
      name: 'Poly VVX 300',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx300.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 301',
      name: 'Poly VVX 301',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx301.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 310',
      name: 'Poly VVX 310',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx310.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 311',
      name: 'Poly VVX 311',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx311.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 350',
      name: 'Poly VVX 350',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx350.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 400',
      name: 'Poly VVX 400',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx400.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 401',
      name: 'Poly VVX 401',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx401.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 410',
      name: 'Poly VVX 410',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx410.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 411',
      name: 'Poly VVX 411',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx411.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 450',
      name: 'Poly VVX 450',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx450.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 500',
      name: 'Poly VVX 500',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx500.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 501',
      name: 'Poly VVX 501',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx501.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 600',
      name: 'Poly VVX 600',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx600.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'VVX 601',
      name: 'Poly VVX 601',
      productImages: {
        edges: [
          { node: { url: 'https://static.lens.poly.com/images/vvx601.png' } },
        ],
      },
      metadata: null,
    },
  },
  {
    node: {
      id: 'Zoom',
      name: 'Zoom Room',
      productImages: { edges: [] },
      metadata: null,
    },
  },
];
