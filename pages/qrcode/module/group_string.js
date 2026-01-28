import QRCodeGroup from "./group.js";
import QRCodeBuffer from "./buffer.js";
QRCodeGroupString.infos = {
  "1": {
    "L": {
      "total": 19,
      "ECPerBlock": 7,
      "group1": {
        "size": 1,
        "numberOfCodeword": 19
      }
    },
    "M": {
      "total": 16,
      "ECPerBlock": 10,
      "group1": {
        "size": 1,
        "numberOfCodeword": 16
      }
    },
    "Q": {
      "total": 13,
      "ECPerBlock": 13,
      "group1": {
        "size": 1,
        "numberOfCodeword": 13
      }
    },
    "H": {
      "total": 9,
      "ECPerBlock": 17,
      "group1": {
        "size": 1,
        "numberOfCodeword": 9
      }
    }
  },
  "2": {
    "L": {
      "total": 34,
      "ECPerBlock": 10,
      "group1": {
        "size": 1,
        "numberOfCodeword": 34
      }
    },
    "M": {
      "total": 28,
      "ECPerBlock": 16,
      "group1": {
        "size": 1,
        "numberOfCodeword": 28
      }
    },
    "Q": {
      "total": 22,
      "ECPerBlock": 22,
      "group1": {
        "size": 1,
        "numberOfCodeword": 22
      }
    },
    "H": {
      "total": 16,
      "ECPerBlock": 28,
      "group1": {
        "size": 1,
        "numberOfCodeword": 16
      }
    }
  },
  "3": {
    "L": {
      "total": 55,
      "ECPerBlock": 15,
      "group1": {
        "size": 1,
        "numberOfCodeword": 55
      }
    },
    "M": {
      "total": 44,
      "ECPerBlock": 26,
      "group1": {
        "size": 1,
        "numberOfCodeword": 44
      }
    },
    "Q": {
      "total": 34,
      "ECPerBlock": 18,
      "group1": {
        "size": 2,
        "numberOfCodeword": 17
      }
    },
    "H": {
      "total": 26,
      "ECPerBlock": 22,
      "group1": {
        "size": 2,
        "numberOfCodeword": 13
      }
    }
  },
  "4": {
    "L": {
      "total": 80,
      "ECPerBlock": 20,
      "group1": {
        "size": 1,
        "numberOfCodeword": 80
      }
    },
    "M": {
      "total": 64,
      "ECPerBlock": 18,
      "group1": {
        "size": 2,
        "numberOfCodeword": 32
      }
    },
    "Q": {
      "total": 48,
      "ECPerBlock": 26,
      "group1": {
        "size": 2,
        "numberOfCodeword": 24
      }
    },
    "H": {
      "total": 36,
      "ECPerBlock": 16,
      "group1": {
        "size": 4,
        "numberOfCodeword": 9
      }
    }
  },
  "5": {
    "L": {
      "total": 108,
      "ECPerBlock": 26,
      "group1": {
        "size": 1,
        "numberOfCodeword": 108
      }
    },
    "M": {
      "total": 86,
      "ECPerBlock": 24,
      "group1": {
        "size": 2,
        "numberOfCodeword": 43
      }
    },
    "Q": {
      "total": 62,
      "ECPerBlock": 18,
      "group1": {
        "size": 2,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 16
      }
    },
    "H": {
      "total": 46,
      "ECPerBlock": 22,
      "group1": {
        "size": 2,
        "numberOfCodeword": 11
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 12
      }
    }
  },
  "6": {
    "L": {
      "total": 136,
      "ECPerBlock": 18,
      "group1": {
        "size": 2,
        "numberOfCodeword": 68
      }
    },
    "M": {
      "total": 108,
      "ECPerBlock": 16,
      "group1": {
        "size": 4,
        "numberOfCodeword": 27
      }
    },
    "Q": {
      "total": 76,
      "ECPerBlock": 24,
      "group1": {
        "size": 4,
        "numberOfCodeword": 19
      }
    },
    "H": {
      "total": 60,
      "ECPerBlock": 28,
      "group1": {
        "size": 4,
        "numberOfCodeword": 15
      }
    }
  },
  "7": {
    "L": {
      "total": 156,
      "ECPerBlock": 20,
      "group1": {
        "size": 2,
        "numberOfCodeword": 78
      }
    },
    "M": {
      "total": 124,
      "ECPerBlock": 18,
      "group1": {
        "size": 4,
        "numberOfCodeword": 31
      }
    },
    "Q": {
      "total": 88,
      "ECPerBlock": 18,
      "group1": {
        "size": 2,
        "numberOfCodeword": 14
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 15
      }
    },
    "H": {
      "total": 66,
      "ECPerBlock": 26,
      "group1": {
        "size": 4,
        "numberOfCodeword": 13
      },
      "group2": {
        "size": 1,
        "numberOfCodeword": 14
      }
    }
  },
  "8": {
    "L": {
      "total": 194,
      "ECPerBlock": 24,
      "group1": {
        "size": 2,
        "numberOfCodeword": 97
      }
    },
    "M": {
      "total": 154,
      "ECPerBlock": 22,
      "group1": {
        "size": 2,
        "numberOfCodeword": 38
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 39
      }
    },
    "Q": {
      "total": 110,
      "ECPerBlock": 22,
      "group1": {
        "size": 4,
        "numberOfCodeword": 18
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 19
      }
    },
    "H": {
      "total": 86,
      "ECPerBlock": 26,
      "group1": {
        "size": 4,
        "numberOfCodeword": 14
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 15
      }
    }
  },
  "9": {
    "L": {
      "total": 232,
      "ECPerBlock": 30,
      "group1": {
        "size": 2,
        "numberOfCodeword": 116
      }
    },
    "M": {
      "total": 182,
      "ECPerBlock": 22,
      "group1": {
        "size": 3,
        "numberOfCodeword": 36
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 37
      }
    },
    "Q": {
      "total": 132,
      "ECPerBlock": 20,
      "group1": {
        "size": 4,
        "numberOfCodeword": 16
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 17
      }
    },
    "H": {
      "total": 100,
      "ECPerBlock": 24,
      "group1": {
        "size": 4,
        "numberOfCodeword": 12
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 13
      }
    }
  },
  "10": {
    "L": {
      "total": 274,
      "ECPerBlock": 18,
      "group1": {
        "size": 2,
        "numberOfCodeword": 68
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 69
      }
    },
    "M": {
      "total": 216,
      "ECPerBlock": 26,
      "group1": {
        "size": 4,
        "numberOfCodeword": 43
      },
      "group2": {
        "size": 1,
        "numberOfCodeword": 44
      }
    },
    "Q": {
      "total": 154,
      "ECPerBlock": 24,
      "group1": {
        "size": 6,
        "numberOfCodeword": 19
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 20
      }
    },
    "H": {
      "total": 122,
      "ECPerBlock": 28,
      "group1": {
        "size": 6,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 16
      }
    }
  },
  "11": {
    "L": {
      "total": 324,
      "ECPerBlock": 20,
      "group1": {
        "size": 4,
        "numberOfCodeword": 81
      }
    },
    "M": {
      "total": 254,
      "ECPerBlock": 30,
      "group1": {
        "size": 1,
        "numberOfCodeword": 50
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 51
      }
    },
    "Q": {
      "total": 180,
      "ECPerBlock": 28,
      "group1": {
        "size": 4,
        "numberOfCodeword": 22
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 23
      }
    },
    "H": {
      "total": 140,
      "ECPerBlock": 24,
      "group1": {
        "size": 3,
        "numberOfCodeword": 12
      },
      "group2": {
        "size": 8,
        "numberOfCodeword": 13
      }
    }
  },
  "12": {
    "L": {
      "total": 370,
      "ECPerBlock": 24,
      "group1": {
        "size": 2,
        "numberOfCodeword": 92
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 93
      }
    },
    "M": {
      "total": 290,
      "ECPerBlock": 22,
      "group1": {
        "size": 6,
        "numberOfCodeword": 36
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 37
      }
    },
    "Q": {
      "total": 206,
      "ECPerBlock": 26,
      "group1": {
        "size": 4,
        "numberOfCodeword": 20
      },
      "group2": {
        "size": 6,
        "numberOfCodeword": 21
      }
    },
    "H": {
      "total": 158,
      "ECPerBlock": 28,
      "group1": {
        "size": 7,
        "numberOfCodeword": 14
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 15
      }
    }
  },
  "13": {
    "L": {
      "total": 428,
      "ECPerBlock": 26,
      "group1": {
        "size": 4,
        "numberOfCodeword": 107
      }
    },
    "M": {
      "total": 334,
      "ECPerBlock": 22,
      "group1": {
        "size": 8,
        "numberOfCodeword": 37
      },
      "group2": {
        "size": 1,
        "numberOfCodeword": 38
      }
    },
    "Q": {
      "total": 244,
      "ECPerBlock": 24,
      "group1": {
        "size": 8,
        "numberOfCodeword": 20
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 21
      }
    },
    "H": {
      "total": 180,
      "ECPerBlock": 22,
      "group1": {
        "size": 12,
        "numberOfCodeword": 11
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 12
      }
    }
  },
  "14": {
    "L": {
      "total": 461,
      "ECPerBlock": 30,
      "group1": {
        "size": 3,
        "numberOfCodeword": 115
      },
      "group2": {
        "size": 1,
        "numberOfCodeword": 116
      }
    },
    "M": {
      "total": 365,
      "ECPerBlock": 24,
      "group1": {
        "size": 4,
        "numberOfCodeword": 40
      },
      "group2": {
        "size": 5,
        "numberOfCodeword": 41
      }
    },
    "Q": {
      "total": 261,
      "ECPerBlock": 20,
      "group1": {
        "size": 11,
        "numberOfCodeword": 16
      },
      "group2": {
        "size": 5,
        "numberOfCodeword": 17
      }
    },
    "H": {
      "total": 197,
      "ECPerBlock": 24,
      "group1": {
        "size": 11,
        "numberOfCodeword": 12
      },
      "group2": {
        "size": 5,
        "numberOfCodeword": 13
      }
    }
  },
  "15": {
    "L": {
      "total": 523,
      "ECPerBlock": 22,
      "group1": {
        "size": 5,
        "numberOfCodeword": 87
      },
      "group2": {
        "size": 1,
        "numberOfCodeword": 88
      }
    },
    "M": {
      "total": 415,
      "ECPerBlock": 24,
      "group1": {
        "size": 5,
        "numberOfCodeword": 41
      },
      "group2": {
        "size": 5,
        "numberOfCodeword": 42
      }
    },
    "Q": {
      "total": 295,
      "ECPerBlock": 30,
      "group1": {
        "size": 5,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 7,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 223,
      "ECPerBlock": 24,
      "group1": {
        "size": 11,
        "numberOfCodeword": 12
      },
      "group2": {
        "size": 7,
        "numberOfCodeword": 13
      }
    }
  },
  "16": {
    "L": {
      "total": 589,
      "ECPerBlock": 24,
      "group1": {
        "size": 5,
        "numberOfCodeword": 98
      },
      "group2": {
        "size": 1,
        "numberOfCodeword": 99
      }
    },
    "M": {
      "total": 453,
      "ECPerBlock": 28,
      "group1": {
        "size": 7,
        "numberOfCodeword": 45
      },
      "group2": {
        "size": 3,
        "numberOfCodeword": 46
      }
    },
    "Q": {
      "total": 325,
      "ECPerBlock": 24,
      "group1": {
        "size": 15,
        "numberOfCodeword": 19
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 20
      }
    },
    "H": {
      "total": 253,
      "ECPerBlock": 30,
      "group1": {
        "size": 3,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 13,
        "numberOfCodeword": 16
      }
    }
  },
  "17": {
    "L": {
      "total": 647,
      "ECPerBlock": 28,
      "group1": {
        "size": 1,
        "numberOfCodeword": 107
      },
      "group2": {
        "size": 5,
        "numberOfCodeword": 108
      }
    },
    "M": {
      "total": 507,
      "ECPerBlock": 28,
      "group1": {
        "size": 10,
        "numberOfCodeword": 46
      },
      "group2": {
        "size": 1,
        "numberOfCodeword": 47
      }
    },
    "Q": {
      "total": 367,
      "ECPerBlock": 28,
      "group1": {
        "size": 1,
        "numberOfCodeword": 22
      },
      "group2": {
        "size": 15,
        "numberOfCodeword": 23
      }
    },
    "H": {
      "total": 283,
      "ECPerBlock": 28,
      "group1": {
        "size": 2,
        "numberOfCodeword": 14
      },
      "group2": {
        "size": 17,
        "numberOfCodeword": 15
      }
    }
  },
  "18": {
    "L": {
      "total": 721,
      "ECPerBlock": 30,
      "group1": {
        "size": 5,
        "numberOfCodeword": 120
      },
      "group2": {
        "size": 1,
        "numberOfCodeword": 121
      }
    },
    "M": {
      "total": 563,
      "ECPerBlock": 26,
      "group1": {
        "size": 9,
        "numberOfCodeword": 43
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 44
      }
    },
    "Q": {
      "total": 397,
      "ECPerBlock": 28,
      "group1": {
        "size": 17,
        "numberOfCodeword": 22
      },
      "group2": {
        "size": 1,
        "numberOfCodeword": 23
      }
    },
    "H": {
      "total": 313,
      "ECPerBlock": 28,
      "group1": {
        "size": 2,
        "numberOfCodeword": 14
      },
      "group2": {
        "size": 19,
        "numberOfCodeword": 15
      }
    }
  },
  "19": {
    "L": {
      "total": 795,
      "ECPerBlock": 28,
      "group1": {
        "size": 3,
        "numberOfCodeword": 113
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 114
      }
    },
    "M": {
      "total": 627,
      "ECPerBlock": 26,
      "group1": {
        "size": 3,
        "numberOfCodeword": 44
      },
      "group2": {
        "size": 11,
        "numberOfCodeword": 45
      }
    },
    "Q": {
      "total": 445,
      "ECPerBlock": 26,
      "group1": {
        "size": 17,
        "numberOfCodeword": 21
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 22
      }
    },
    "H": {
      "total": 341,
      "ECPerBlock": 26,
      "group1": {
        "size": 9,
        "numberOfCodeword": 13
      },
      "group2": {
        "size": 16,
        "numberOfCodeword": 14
      }
    }
  },
  "20": {
    "L": {
      "total": 861,
      "ECPerBlock": 28,
      "group1": {
        "size": 3,
        "numberOfCodeword": 107
      },
      "group2": {
        "size": 5,
        "numberOfCodeword": 108
      }
    },
    "M": {
      "total": 669,
      "ECPerBlock": 26,
      "group1": {
        "size": 3,
        "numberOfCodeword": 41
      },
      "group2": {
        "size": 13,
        "numberOfCodeword": 42
      }
    },
    "Q": {
      "total": 485,
      "ECPerBlock": 30,
      "group1": {
        "size": 15,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 5,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 385,
      "ECPerBlock": 28,
      "group1": {
        "size": 15,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 10,
        "numberOfCodeword": 16
      }
    }
  },
  "21": {
    "L": {
      "total": 932,
      "ECPerBlock": 28,
      "group1": {
        "size": 4,
        "numberOfCodeword": 116
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 117
      }
    },
    "M": {
      "total": 714,
      "ECPerBlock": 26,
      "group1": {
        "size": 17,
        "numberOfCodeword": 42
      }
    },
    "Q": {
      "total": 512,
      "ECPerBlock": 28,
      "group1": {
        "size": 17,
        "numberOfCodeword": 22
      },
      "group2": {
        "size": 6,
        "numberOfCodeword": 23
      }
    },
    "H": {
      "total": 406,
      "ECPerBlock": 30,
      "group1": {
        "size": 19,
        "numberOfCodeword": 16
      },
      "group2": {
        "size": 6,
        "numberOfCodeword": 17
      }
    }
  },
  "22": {
    "L": {
      "total": 1006,
      "ECPerBlock": 28,
      "group1": {
        "size": 2,
        "numberOfCodeword": 111
      },
      "group2": {
        "size": 7,
        "numberOfCodeword": 112
      }
    },
    "M": {
      "total": 782,
      "ECPerBlock": 28,
      "group1": {
        "size": 17,
        "numberOfCodeword": 46
      }
    },
    "Q": {
      "total": 568,
      "ECPerBlock": 30,
      "group1": {
        "size": 7,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 16,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 442,
      "ECPerBlock": 24,
      "group1": {
        "size": 34,
        "numberOfCodeword": 13
      }
    }
  },
  "23": {
    "L": {
      "total": 1094,
      "ECPerBlock": 30,
      "group1": {
        "size": 4,
        "numberOfCodeword": 121
      },
      "group2": {
        "size": 5,
        "numberOfCodeword": 122
      }
    },
    "M": {
      "total": 860,
      "ECPerBlock": 28,
      "group1": {
        "size": 4,
        "numberOfCodeword": 47
      },
      "group2": {
        "size": 14,
        "numberOfCodeword": 48
      }
    },
    "Q": {
      "total": 614,
      "ECPerBlock": 30,
      "group1": {
        "size": 11,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 14,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 464,
      "ECPerBlock": 30,
      "group1": {
        "size": 16,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 14,
        "numberOfCodeword": 16
      }
    }
  },
  "24": {
    "L": {
      "total": 1174,
      "ECPerBlock": 30,
      "group1": {
        "size": 6,
        "numberOfCodeword": 117
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 118
      }
    },
    "M": {
      "total": 914,
      "ECPerBlock": 28,
      "group1": {
        "size": 6,
        "numberOfCodeword": 45
      },
      "group2": {
        "size": 14,
        "numberOfCodeword": 46
      }
    },
    "Q": {
      "total": 664,
      "ECPerBlock": 30,
      "group1": {
        "size": 11,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 16,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 514,
      "ECPerBlock": 30,
      "group1": {
        "size": 30,
        "numberOfCodeword": 16
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 17
      }
    }
  },
  "25": {
    "L": {
      "total": 1276,
      "ECPerBlock": 26,
      "group1": {
        "size": 8,
        "numberOfCodeword": 106
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 107
      }
    },
    "M": {
      "total": 1000,
      "ECPerBlock": 28,
      "group1": {
        "size": 8,
        "numberOfCodeword": 47
      },
      "group2": {
        "size": 13,
        "numberOfCodeword": 48
      }
    },
    "Q": {
      "total": 718,
      "ECPerBlock": 30,
      "group1": {
        "size": 7,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 22,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 538,
      "ECPerBlock": 30,
      "group1": {
        "size": 22,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 13,
        "numberOfCodeword": 16
      }
    }
  },
  "26": {
    "L": {
      "total": 1370,
      "ECPerBlock": 28,
      "group1": {
        "size": 10,
        "numberOfCodeword": 114
      },
      "group2": {
        "size": 2,
        "numberOfCodeword": 115
      }
    },
    "M": {
      "total": 1062,
      "ECPerBlock": 28,
      "group1": {
        "size": 19,
        "numberOfCodeword": 46
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 47
      }
    },
    "Q": {
      "total": 754,
      "ECPerBlock": 28,
      "group1": {
        "size": 28,
        "numberOfCodeword": 22
      },
      "group2": {
        "size": 6,
        "numberOfCodeword": 23
      }
    },
    "H": {
      "total": 596,
      "ECPerBlock": 30,
      "group1": {
        "size": 33,
        "numberOfCodeword": 16
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 17
      }
    }
  },
  "27": {
    "L": {
      "total": 1468,
      "ECPerBlock": 30,
      "group1": {
        "size": 8,
        "numberOfCodeword": 122
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 123
      }
    },
    "M": {
      "total": 1128,
      "ECPerBlock": 28,
      "group1": {
        "size": 22,
        "numberOfCodeword": 45
      },
      "group2": {
        "size": 3,
        "numberOfCodeword": 46
      }
    },
    "Q": {
      "total": 808,
      "ECPerBlock": 30,
      "group1": {
        "size": 8,
        "numberOfCodeword": 23
      },
      "group2": {
        "size": 26,
        "numberOfCodeword": 24
      }
    },
    "H": {
      "total": 628,
      "ECPerBlock": 30,
      "group1": {
        "size": 12,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 28,
        "numberOfCodeword": 16
      }
    }
  },
  "28": {
    "L": {
      "total": 1531,
      "ECPerBlock": 30,
      "group1": {
        "size": 3,
        "numberOfCodeword": 117
      },
      "group2": {
        "size": 10,
        "numberOfCodeword": 118
      }
    },
    "M": {
      "total": 1193,
      "ECPerBlock": 28,
      "group1": {
        "size": 3,
        "numberOfCodeword": 45
      },
      "group2": {
        "size": 23,
        "numberOfCodeword": 46
      }
    },
    "Q": {
      "total": 871,
      "ECPerBlock": 30,
      "group1": {
        "size": 4,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 31,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 661,
      "ECPerBlock": 30,
      "group1": {
        "size": 11,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 31,
        "numberOfCodeword": 16
      }
    }
  },
  "29": {
    "L": {
      "total": 1631,
      "ECPerBlock": 30,
      "group1": {
        "size": 7,
        "numberOfCodeword": 116
      },
      "group2": {
        "size": 7,
        "numberOfCodeword": 117
      }
    },
    "M": {
      "total": 1267,
      "ECPerBlock": 28,
      "group1": {
        "size": 21,
        "numberOfCodeword": 45
      },
      "group2": {
        "size": 7,
        "numberOfCodeword": 46
      }
    },
    "Q": {
      "total": 911,
      "ECPerBlock": 30,
      "group1": {
        "size": 1,
        "numberOfCodeword": 23
      },
      "group2": {
        "size": 37,
        "numberOfCodeword": 24
      }
    },
    "H": {
      "total": 701,
      "ECPerBlock": 30,
      "group1": {
        "size": 19,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 26,
        "numberOfCodeword": 16
      }
    }
  },
  "30": {
    "L": {
      "total": 1735,
      "ECPerBlock": 30,
      "group1": {
        "size": 5,
        "numberOfCodeword": 115
      },
      "group2": {
        "size": 10,
        "numberOfCodeword": 116
      }
    },
    "M": {
      "total": 1373,
      "ECPerBlock": 28,
      "group1": {
        "size": 19,
        "numberOfCodeword": 47
      },
      "group2": {
        "size": 10,
        "numberOfCodeword": 48
      }
    },
    "Q": {
      "total": 985,
      "ECPerBlock": 30,
      "group1": {
        "size": 15,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 25,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 745,
      "ECPerBlock": 30,
      "group1": {
        "size": 23,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 25,
        "numberOfCodeword": 16
      }
    }
  },
  "31": {
    "L": {
      "total": 1843,
      "ECPerBlock": 30,
      "group1": {
        "size": 13,
        "numberOfCodeword": 115
      },
      "group2": {
        "size": 3,
        "numberOfCodeword": 116
      }
    },
    "M": {
      "total": 1455,
      "ECPerBlock": 28,
      "group1": {
        "size": 2,
        "numberOfCodeword": 46
      },
      "group2": {
        "size": 29,
        "numberOfCodeword": 47
      }
    },
    "Q": {
      "total": 1033,
      "ECPerBlock": 30,
      "group1": {
        "size": 42,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 1,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 793,
      "ECPerBlock": 30,
      "group1": {
        "size": 23,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 28,
        "numberOfCodeword": 16
      }
    }
  },
  "32": {
    "L": {
      "total": 1955,
      "ECPerBlock": 30,
      "group1": {
        "size": 17,
        "numberOfCodeword": 115
      }
    },
    "M": {
      "total": 1541,
      "ECPerBlock": 28,
      "group1": {
        "size": 10,
        "numberOfCodeword": 46
      },
      "group2": {
        "size": 23,
        "numberOfCodeword": 47
      }
    },
    "Q": {
      "total": 1115,
      "ECPerBlock": 30,
      "group1": {
        "size": 10,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 35,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 845,
      "ECPerBlock": 30,
      "group1": {
        "size": 19,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 35,
        "numberOfCodeword": 16
      }
    }
  },
  "33": {
    "L": {
      "total": 2071,
      "ECPerBlock": 30,
      "group1": {
        "size": 17,
        "numberOfCodeword": 115
      },
      "group2": {
        "size": 1,
        "numberOfCodeword": 116
      }
    },
    "M": {
      "total": 1631,
      "ECPerBlock": 28,
      "group1": {
        "size": 14,
        "numberOfCodeword": 46
      },
      "group2": {
        "size": 21,
        "numberOfCodeword": 47
      }
    },
    "Q": {
      "total": 1171,
      "ECPerBlock": 30,
      "group1": {
        "size": 29,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 19,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 901,
      "ECPerBlock": 30,
      "group1": {
        "size": 11,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 46,
        "numberOfCodeword": 16
      }
    }
  },
  "34": {
    "L": {
      "total": 2191,
      "ECPerBlock": 30,
      "group1": {
        "size": 13,
        "numberOfCodeword": 115
      },
      "group2": {
        "size": 6,
        "numberOfCodeword": 116
      }
    },
    "M": {
      "total": 1725,
      "ECPerBlock": 28,
      "group1": {
        "size": 14,
        "numberOfCodeword": 46
      },
      "group2": {
        "size": 23,
        "numberOfCodeword": 47
      }
    },
    "Q": {
      "total": 1231,
      "ECPerBlock": 30,
      "group1": {
        "size": 44,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 7,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 961,
      "ECPerBlock": 30,
      "group1": {
        "size": 59,
        "numberOfCodeword": 16
      },
      "group2": {
        "size": 1,
        "numberOfCodeword": 17
      }
    }
  },
  "35": {
    "L": {
      "total": 2306,
      "ECPerBlock": 30,
      "group1": {
        "size": 12,
        "numberOfCodeword": 121
      },
      "group2": {
        "size": 7,
        "numberOfCodeword": 122
      }
    },
    "M": {
      "total": 1812,
      "ECPerBlock": 28,
      "group1": {
        "size": 12,
        "numberOfCodeword": 47
      },
      "group2": {
        "size": 26,
        "numberOfCodeword": 48
      }
    },
    "Q": {
      "total": 1286,
      "ECPerBlock": 30,
      "group1": {
        "size": 39,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 14,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 986,
      "ECPerBlock": 30,
      "group1": {
        "size": 22,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 41,
        "numberOfCodeword": 16
      }
    }
  },
  "36": {
    "L": {
      "total": 2434,
      "ECPerBlock": 30,
      "group1": {
        "size": 6,
        "numberOfCodeword": 121
      },
      "group2": {
        "size": 14,
        "numberOfCodeword": 122
      }
    },
    "M": {
      "total": 1914,
      "ECPerBlock": 28,
      "group1": {
        "size": 6,
        "numberOfCodeword": 47
      },
      "group2": {
        "size": 34,
        "numberOfCodeword": 48
      }
    },
    "Q": {
      "total": 1354,
      "ECPerBlock": 30,
      "group1": {
        "size": 46,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 10,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 1054,
      "ECPerBlock": 30,
      "group1": {
        "size": 2,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 64,
        "numberOfCodeword": 16
      }
    }
  },
  "37": {
    "L": {
      "total": 2566,
      "ECPerBlock": 30,
      "group1": {
        "size": 17,
        "numberOfCodeword": 122
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 123
      }
    },
    "M": {
      "total": 1992,
      "ECPerBlock": 28,
      "group1": {
        "size": 29,
        "numberOfCodeword": 46
      },
      "group2": {
        "size": 14,
        "numberOfCodeword": 47
      }
    },
    "Q": {
      "total": 1426,
      "ECPerBlock": 30,
      "group1": {
        "size": 49,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 10,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 1096,
      "ECPerBlock": 30,
      "group1": {
        "size": 24,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 46,
        "numberOfCodeword": 16
      }
    }
  },
  "38": {
    "L": {
      "total": 2702,
      "ECPerBlock": 30,
      "group1": {
        "size": 4,
        "numberOfCodeword": 122
      },
      "group2": {
        "size": 18,
        "numberOfCodeword": 123
      }
    },
    "M": {
      "total": 2102,
      "ECPerBlock": 28,
      "group1": {
        "size": 13,
        "numberOfCodeword": 46
      },
      "group2": {
        "size": 32,
        "numberOfCodeword": 47
      }
    },
    "Q": {
      "total": 1502,
      "ECPerBlock": 30,
      "group1": {
        "size": 48,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 14,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 1142,
      "ECPerBlock": 30,
      "group1": {
        "size": 42,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 32,
        "numberOfCodeword": 16
      }
    }
  },
  "39": {
    "L": {
      "total": 2812,
      "ECPerBlock": 30,
      "group1": {
        "size": 20,
        "numberOfCodeword": 117
      },
      "group2": {
        "size": 4,
        "numberOfCodeword": 118
      }
    },
    "M": {
      "total": 2216,
      "ECPerBlock": 28,
      "group1": {
        "size": 40,
        "numberOfCodeword": 47
      },
      "group2": {
        "size": 7,
        "numberOfCodeword": 48
      }
    },
    "Q": {
      "total": 1582,
      "ECPerBlock": 30,
      "group1": {
        "size": 43,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 22,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 1222,
      "ECPerBlock": 30,
      "group1": {
        "size": 10,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 67,
        "numberOfCodeword": 16
      }
    }
  },
  "40": {
    "L": {
      "total": 2956,
      "ECPerBlock": 30,
      "group1": {
        "size": 19,
        "numberOfCodeword": 118
      },
      "group2": {
        "size": 6,
        "numberOfCodeword": 119
      }
    },
    "M": {
      "total": 2334,
      "ECPerBlock": 28,
      "group1": {
        "size": 18,
        "numberOfCodeword": 47
      },
      "group2": {
        "size": 31,
        "numberOfCodeword": 48
      }
    },
    "Q": {
      "total": 1666,
      "ECPerBlock": 30,
      "group1": {
        "size": 34,
        "numberOfCodeword": 24
      },
      "group2": {
        "size": 34,
        "numberOfCodeword": 25
      }
    },
    "H": {
      "total": 1276,
      "ECPerBlock": 30,
      "group1": {
        "size": 20,
        "numberOfCodeword": 15
      },
      "group2": {
        "size": 61,
        "numberOfCodeword": 16
      }
    }
  }
};

QRCodeGroupString.padding = [236, 17];

function QRCodeGroupString(message) {
  this.info = QRCodeGroupString.infos[message.version][message.ecl];
  this.version = message.version;
  this.ecl = message.ecl;

  const codewords = message.codewords.toArray();

  let pad_index = false;

  for (let i = codewords.length; i < this.info.total; i++) {
    codewords.push(QRCodeGroupString.padding[Number(pad_index)]);
    pad_index = !pad_index;
  }

  const end = this.info.group1.size * this.info.group1.numberOfCodeword;
  this.group1 = new QRCodeGroup(message.codewords.slice(0, end),this.info.group1,this.info.ECPerBlock);

  if (this.info.group2) {
    this.group2 = new QRCodeGroup(message.codewords.slice(end),this.info.group2,this.info.ECPerBlock);
  }

  return new QRCodeBuffer(this);
}

export default QRCodeGroupString;
