const swisseph = require("swisseph");

swisseph.swe_set_ephe_path(`${__dirname}/../../eph`);

const { utcToJulianUt, zodiacSign, degreesToDms } = require("./utils");

const PLANETS = {
  sun: swisseph.SE_SUN,
  moon: swisseph.SE_MOON,
  mercury: swisseph.SE_MERCURY,
  venus: swisseph.SE_VENUS,
  mars: swisseph.SE_MARS,
  jupiter: swisseph.SE_JUPITER,
  saturn: swisseph.SE_SATURN,
  uranus: swisseph.SE_URANUS,
  neptune: swisseph.SE_NEPTUNE,
  pluto: swisseph.SE_PLUTO,
  chiron: swisseph.SE_CHIRON,
  lilith: swisseph.SE_MEAN_APOG,
  ceres: swisseph.SE_CERES,
  vesta: swisseph.SE_VESTA,
  pallas: swisseph.SE_PALLAS,
  juno: swisseph.SE_JUNO,
};

const planetsByType = {
  sun: "luminary",
  moon: "luminary",
  mercury: "personal",
  venus: "personal",
  mars: "personal",
  jupiter: "social",
  saturn: "social",
  uranus: "transpersonal",
  neptune: "transpersonal",
  pluto: "transpersonal",
  chiron: "other",
  lilith: "other",
  ceres: "other",
  vesta: "other",
  pallas: "other",
  juno: "other",
};

const FLAG = swisseph.SEFLG_SPEED | swisseph.SEFLG_SWIEPH;

const getPositionOfAstro = (astro, julianDayUT) => swisseph.swe_calc_ut(julianDayUT, PLANETS[astro], FLAG);

const position = (astrologyObject, moment) => {
  const julianDayUT = utcToJulianUt(moment);
  const astro = getPositionOfAstro(astrologyObject, julianDayUT);

  const dms = degreesToDms(astro.longitude);
  return {
    position: {
      longitude: astro.longitude,
      ...dms,
    },
    sign: zodiacSign(astro.longitude),
  };
};

module.exports = {
  PLANETS,
  position,
  planetsByType
};
