import * as big_js31 from "big.js";
import * as big_js33 from "big.js";
import * as big_js36 from "big.js";
import * as big_js38 from "big.js";
import * as big_js40 from "big.js";
import * as big_js42 from "big.js";
import * as big_js44 from "big.js";
import * as big_js46 from "big.js";
import * as big_js48 from "big.js";
import { Big as Big$1 } from "big.js";

//#region src/types/binary-operation.d.ts
type BinaryOperation<TInput, TOutput = TInput> = (a: TInput, b: TInput) => TOutput;

//#endregion
//#region src/types/calculator.d.ts
declare const ComparisonOperator: {
  readonly LT: -1;
  readonly EQ: 0;
  readonly GT: 1;
};
type ComparisonOperator = (typeof ComparisonOperator)[keyof typeof ComparisonOperator];
type Calculator<TInput> = {
  readonly add: BinaryOperation<TInput>;
  readonly compare: BinaryOperation<TInput, ComparisonOperator>;
  readonly decrement: UnaryOperation<TInput>;
  readonly integerDivide: BinaryOperation<TInput>;
  readonly increment: UnaryOperation<TInput>;
  readonly modulo: BinaryOperation<TInput>;
  readonly multiply: BinaryOperation<TInput>;
  readonly power: BinaryOperation<TInput>;
  readonly subtract: BinaryOperation<TInput>;
  readonly zero: () => TInput;
};

//#endregion
//#region src/types/divide-operation.d.ts
type DivideOperation = <TAmount>(amount: TAmount, factor: TAmount, calculator: Calculator<TAmount>) => TAmount;

//#endregion
//#region src/types/formatter.d.ts
type Formatter<TAmount> = {
  readonly toNumber: (value?: TAmount) => number;
  readonly toString: (value?: TAmount) => string;
};

//#endregion
//#region src/types/monetary.d.ts
type Monetary<TAmount> = MonetarySnapshot<TAmount>;

//#endregion
//#region src/types/monetary-factory.d.ts
type MonetaryFactory<TAmount> = ({
  amount,
  currency,
  scale
}: MonetaryOptions<TAmount>) => Monetary<TAmount>;

//#endregion
//#region src/currencies/types/currency.d.ts
type Currency<TAmount> = {
  /**
   * The unique code of the currency.
   */
  readonly code: string;
  /**
   * The base, or radix of the currency.
   */
  readonly base: TAmount | readonly TAmount[];
  /**
   * The exponent of the currency.
   */
  readonly exponent: TAmount;
};

//#endregion
//#region src/currencies/iso4217/amendments/168/aed.d.ts
/**
 * United Arab Emirates dirham.
 */
declare const AED: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/afn.d.ts
/**
 * Afghan afghani.
 */
declare const AFN: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/all.d.ts
/**
 * Albanian lek.
 */
declare const ALL: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/amd.d.ts
/**
 * Armenian dram.
 */
declare const AMD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/ang.d.ts
/**
 * Netherlands Antillean guilder.
 */
declare const ANG: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/aoa.d.ts
/**
 * Angolan kwanza.
 */
declare const AOA: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/ars.d.ts
/**
 * Argentine peso.
 */
declare const ARS: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/aud.d.ts
/**
 * Australian dollar.
 */
declare const AUD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/awg.d.ts
/**
 * Aruban florin.
 */
declare const AWG: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/azn.d.ts
/**
 * Azerbaijani manat.
 */
declare const AZN: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/bam.d.ts
/**
 * Bosnia and Herzegovina convertible mark.
 */
declare const BAM: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/bbd.d.ts
/**
 * Barbados dollar.
 */
declare const BBD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/bdt.d.ts
/**
 * Bangladeshi taka.
 */
declare const BDT: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/bgn.d.ts
/**
 * Bulgarian lev.
 */
declare const BGN: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/bhd.d.ts
/**
 * Bahraini dinar.
 */
declare const BHD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/bif.d.ts
/**
 * Burundian franc.
 */
declare const BIF: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/bmd.d.ts
/**
 * Bermudian dollar.
 */
declare const BMD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/bnd.d.ts
/**
 * Brunei dollar.
 */
declare const BND: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/bob.d.ts
/**
 * Bolivian boliviano.
 */
declare const BOB: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/bov.d.ts
/**
 * Bolivian Mvdol.
 */
declare const BOV: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/brl.d.ts
/**
 * Brazilian real.
 */
declare const BRL: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/bsd.d.ts
/**
 * Bahamian dollar.
 */
declare const BSD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/btn.d.ts
/**
 * Bhutanese ngultrum.
 */
declare const BTN: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/bwp.d.ts
/**
 * Botswana pula.
 */
declare const BWP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/byn.d.ts
/**
 * Belarusian ruble.
 */
declare const BYN: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/bzd.d.ts
/**
 * Belize dollar.
 */
declare const BZD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/cad.d.ts
/**
 * Canadian dollar.
 */
declare const CAD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/cdf.d.ts
/**
 * Congolese franc.
 */
declare const CDF: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/che.d.ts
/**
 * WIR Euro.
 */
declare const CHE: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/chf.d.ts
/**
 * Swiss franc.
 */
declare const CHF: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/chw.d.ts
/**
 * WIR Franc.
 */
declare const CHW: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/clf.d.ts
/**
 * Unidad de Fomento.
 */
declare const CLF: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/clp.d.ts
/**
 * Chilean peso.
 */
declare const CLP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/cny.d.ts
/**
 * Renminbi (Chinese) yuan.
 */
declare const CNY: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/cop.d.ts
/**
 * Colombian peso.
 */
declare const COP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/cou.d.ts
/**
 * Unidad de Valor Real.
 */
declare const COU: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/crc.d.ts
/**
 * Costa Rican colón.
 */
declare const CRC: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/cuc.d.ts
/**
 * Cuban convertible peso.
 */
declare const CUC: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/cup.d.ts
/**
 * Cuban peso.
 */
declare const CUP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/cve.d.ts
/**
 * Cape Verdean escudo.
 */
declare const CVE: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/czk.d.ts
/**
 * Czech koruna.
 */
declare const CZK: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/djf.d.ts
/**
 * Djiboutian franc.
 */
declare const DJF: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/dkk.d.ts
/**
 * Danish krone.
 */
declare const DKK: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/dop.d.ts
/**
 * Dominican peso.
 */
declare const DOP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/dzd.d.ts
/**
 * Algerian dinar.
 */
declare const DZD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/egp.d.ts
/**
 * Egyptian pound.
 */
declare const EGP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/ern.d.ts
/**
 * Eritrean nakfa.
 */
declare const ERN: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/etb.d.ts
/**
 * Ethiopian birr.
 */
declare const ETB: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/eur.d.ts
/**
 * Euro.
 */
declare const EUR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/fjd.d.ts
/**
 * Fiji dollar.
 */
declare const FJD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/fkp.d.ts
/**
 * Falkland Islands pound.
 */
declare const FKP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/gbp.d.ts
/**
 * Pound sterling.
 */
declare const GBP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/gel.d.ts
/**
 * Georgian lari.
 */
declare const GEL: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/ghs.d.ts
/**
 * Ghanaian cedi.
 */
declare const GHS: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/gip.d.ts
/**
 * Gibraltar pound.
 */
declare const GIP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/gmd.d.ts
/**
 * Gambian dalasi.
 */
declare const GMD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/gnf.d.ts
/**
 * Guinean franc.
 */
declare const GNF: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/gtq.d.ts
/**
 * Guatemalan quetzal.
 */
declare const GTQ: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/gyd.d.ts
/**
 * Guyanese dollar.
 */
declare const GYD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/hkd.d.ts
/**
 * Hong Kong dollar.
 */
declare const HKD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/hnl.d.ts
/**
 * Honduran lempira.
 */
declare const HNL: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/hrk.d.ts
/**
 * Croatian kuna.
 */
declare const HRK: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/htg.d.ts
/**
 * Haitian gourde.
 */
declare const HTG: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/huf.d.ts
/**
 * Hungarian forint.
 */
declare const HUF: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/idr.d.ts
/**
 * Indonesian rupiah.
 */
declare const IDR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/ils.d.ts
/**
 * Israeli new shekel.
 */
declare const ILS: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/inr.d.ts
/**
 * Indian rupee.
 */
declare const INR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/iqd.d.ts
/**
 * Iraqi dinar.
 */
declare const IQD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/irr.d.ts
/**
 * Iranian rial.
 */
declare const IRR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/isk.d.ts
/**
 * Icelandic króna.
 */
declare const ISK: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/jmd.d.ts
/**
 * Jamaican dollar.
 */
declare const JMD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/jod.d.ts
/**
 * Jordanian dinar.
 */
declare const JOD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/jpy.d.ts
/**
 * Japanese yen.
 */
declare const JPY: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/kes.d.ts
/**
 * Kenyan shilling.
 */
declare const KES: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/kgs.d.ts
/**
 * Kyrgyzstani som.
 */
declare const KGS: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/khr.d.ts
/**
 * Cambodian riel.
 */
declare const KHR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/kmf.d.ts
/**
 * Comoro franc.
 */
declare const KMF: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/kpw.d.ts
/**
 * North Korean won.
 */
declare const KPW: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/krw.d.ts
/**
 * South Korean won.
 */
declare const KRW: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/kwd.d.ts
/**
 * Kuwaiti dinar.
 */
declare const KWD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/kyd.d.ts
/**
 * Cayman Islands dollar.
 */
declare const KYD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/kzt.d.ts
/**
 * Kazakhstani tenge.
 */
declare const KZT: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/lak.d.ts
/**
 * Lao kip.
 */
declare const LAK: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/lbp.d.ts
/**
 * Lebanese pound.
 */
declare const LBP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/lkr.d.ts
/**
 * Sri Lankan rupee.
 */
declare const LKR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/lrd.d.ts
/**
 * Liberian dollar.
 */
declare const LRD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/lsl.d.ts
/**
 * Lesotho loti.
 */
declare const LSL: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/lyd.d.ts
/**
 * Libyan dinar.
 */
declare const LYD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mad.d.ts
/**
 * Moroccan dirham.
 */
declare const MAD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mdl.d.ts
/**
 * Moldovan leu.
 */
declare const MDL: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mga.d.ts
/**
 * Malagasy ariary.
 */
declare const MGA: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mkd.d.ts
/**
 * Macedonian denar.
 */
declare const MKD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mmk.d.ts
/**
 * Myanmar kyat.
 */
declare const MMK: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mnt.d.ts
/**
 * Mongolian tögrög.
 */
declare const MNT: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mop.d.ts
/**
 * Macanese pataca.
 */
declare const MOP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mru.d.ts
/**
 * Mauritanian ouguiya.
 */
declare const MRU: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mur.d.ts
/**
 * Mauritian rupee.
 */
declare const MUR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mvr.d.ts
/**
 * Maldivian rufiyaa.
 */
declare const MVR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mwk.d.ts
/**
 * Malawian kwacha.
 */
declare const MWK: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mxn.d.ts
/**
 * Mexican peso.
 */
declare const MXN: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mxv.d.ts
/**
 * Mexican Unidad de Inversion.
 */
declare const MXV: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/myr.d.ts
/**
 * Malaysian ringgit.
 */
declare const MYR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/mzn.d.ts
/**
 * Mozambican metical.
 */
declare const MZN: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/nad.d.ts
/**
 * Namibian dollar.
 */
declare const NAD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/ngn.d.ts
/**
 * Nigerian naira.
 */
declare const NGN: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/nio.d.ts
/**
 * Nicaraguan córdoba.
 */
declare const NIO: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/nok.d.ts
/**
 * Norwegian krone.
 */
declare const NOK: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/npr.d.ts
/**
 * Nepalese rupee.
 */
declare const NPR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/nzd.d.ts
/**
 * New Zealand dollar.
 */
declare const NZD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/omr.d.ts
/**
 * Omani rial.
 */
declare const OMR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/pab.d.ts
/**
 * Panamanian balboa.
 */
declare const PAB: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/pen.d.ts
/**
 * Peruvian sol.
 */
declare const PEN: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/pgk.d.ts
/**
 * Papua New Guinean kina.
 */
declare const PGK: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/php.d.ts
/**
 * Philippine peso.
 */
declare const PHP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/pkr.d.ts
/**
 * Pakistani rupee.
 */
declare const PKR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/pln.d.ts
/**
 * Polish złoty.
 */
declare const PLN: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/pyg.d.ts
/**
 * Paraguayan guaraní.
 */
declare const PYG: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/qar.d.ts
/**
 * Qatari riyal.
 */
declare const QAR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/ron.d.ts
/**
 * Romanian leu.
 */
declare const RON: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/rsd.d.ts
/**
 * Serbian dinar.
 */
declare const RSD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/rub.d.ts
/**
 * Russian ruble.
 */
declare const RUB: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/rwf.d.ts
/**
 * Rwandan franc.
 */
declare const RWF: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/sar.d.ts
/**
 * Saudi riyal.
 */
declare const SAR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/sbd.d.ts
/**
 * Solomon Islands dollar.
 */
declare const SBD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/scr.d.ts
/**
 * Seychelles rupee.
 */
declare const SCR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/sdg.d.ts
/**
 * Sudanese pound.
 */
declare const SDG: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/sek.d.ts
/**
 * Swedish krona.
 */
declare const SEK: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/sgd.d.ts
/**
 * Singapore dollar.
 */
declare const SGD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/shp.d.ts
/**
 * Saint Helena pound.
 */
declare const SHP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/sll.d.ts
/**
 * Sierra Leonean leone.
 */
declare const SLL: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/sos.d.ts
/**
 * Somali shilling.
 */
declare const SOS: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/srd.d.ts
/**
 * Surinamese dollar.
 */
declare const SRD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/ssp.d.ts
/**
 * South Sudanese pound.
 */
declare const SSP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/stn.d.ts
/**
 * São Tomé and Príncipe dobra.
 */
declare const STN: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/svc.d.ts
/**
 * Salvadoran colón.
 */
declare const SVC: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/syp.d.ts
/**
 * Syrian pound.
 */
declare const SYP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/szl.d.ts
/**
 * Swazi lilangeni.
 */
declare const SZL: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/thb.d.ts
/**
 * Thai baht.
 */
declare const THB: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/tjs.d.ts
/**
 * Tajikistani somoni.
 */
declare const TJS: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/tmt.d.ts
/**
 * Turkmenistan manat.
 */
declare const TMT: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/tnd.d.ts
/**
 * Tunisian dinar.
 */
declare const TND: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/top.d.ts
/**
 * Tongan paʻanga.
 */
declare const TOP: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/try.d.ts
/**
 * Turkish lira.
 */
declare const TRY: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/ttd.d.ts
/**
 * Trinidad and Tobago dollar.
 */
declare const TTD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/twd.d.ts
/**
 * New Taiwan dollar.
 */
declare const TWD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/tzs.d.ts
/**
 * Tanzanian shilling.
 */
declare const TZS: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/uah.d.ts
/**
 * Ukrainian hryvnia.
 */
declare const UAH: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/ugx.d.ts
/**
 * Ugandan shilling.
 */
declare const UGX: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/usd.d.ts
/**
 * United States dollar.
 */
declare const USD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/usn.d.ts
/**
 * United States dollar (next day).
 */
declare const USN: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/uyi.d.ts
/**
 * Uruguay Peso en Unidades Indexadas.
 */
declare const UYI: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/uyu.d.ts
/**
 * Uruguayan peso.
 */
declare const UYU: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/uyw.d.ts
/**
 * Unidad previsional.
 */
declare const UYW: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/uzs.d.ts
/**
 * Uzbekistani soʻm.
 */
declare const UZS: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/ves.d.ts
/**
 * Venezuelan bolívar.
 */
declare const VES: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/vnd.d.ts
/**
 * Vietnamese đồng.
 */
declare const VND: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/vuv.d.ts
/**
 * Vanuatu vatu.
 */
declare const VUV: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/wst.d.ts
/**
 * Samoan tālā.
 */
declare const WST: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/xaf.d.ts
/**
 * Central African CFA franc.
 */
declare const XAF: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/xcd.d.ts
/**
 * East Caribbean dollar.
 */
declare const XCD: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/xof.d.ts
/**
 * West African CFA franc.
 */
declare const XOF: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/xpf.d.ts
/**
 * CFP franc.
 */
declare const XPF: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/yer.d.ts
/**
 * Yemeni rial.
 */
declare const YER: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/zar.d.ts
/**
 * South African rand.
 */
declare const ZAR: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/zmw.d.ts
/**
 * Zambian kwacha.
 */
declare const ZMW: Currency<number>;

//#endregion
//#region src/currencies/iso4217/amendments/168/zwl.d.ts
/**
 * Zimbabwean dollar.
 */
declare const ZWL: Currency<number>;

//#endregion
//#region src/types/monetary-options.d.ts
type MonetaryOptions<TAmount> = {
  readonly amount: TAmount;
  readonly currency: Currency<TAmount>;
  readonly scale?: TAmount;
};

//#endregion
//#region src/types/monetary-snapshot.d.ts
type MonetarySnapshot<TAmount> = {
  readonly amount: TAmount;
  readonly currency: Currency<TAmount>;
  readonly scale: TAmount;
};

//#endregion
//#region src/types/scaled-amount.d.ts
type ScaledAmount<TAmount> = {
  readonly amount: TAmount;
  readonly scale: TAmount;
};

//#endregion
//#region src/types/rates.d.ts
type Rate<TAmount> = ScaledAmount<TAmount> | TAmount;
type Rates<TAmount> = Record<string, Rate<TAmount>>;

//#endregion
//#region src/types/transformer.d.ts
type TransformerOptions<TAmount, TValue> = {
  readonly value: TValue;
  readonly currency: Currency<TAmount>;
};
type Transformer<TAmount, TOutput, TValue> = (options: TransformerOptions<TAmount, TValue>) => TOutput;

//#endregion
//#region src/types/unary-operation.d.ts
type UnaryOperation<TInput, TOutput = TInput> = (value: TInput) => TOutput;

//#endregion
//#region src/api/add.d.ts
type AddParams<TAmount> = readonly [augend: Monetary<TAmount>, addend: Monetary<TAmount>];

//#endregion
//#region src/api/allocate.d.ts
type AllocateParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>, ratios: ReadonlyArray<ScaledAmount<TAmount> | TAmount>];

//#endregion
//#region src/api/compare.d.ts
type CompareParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>, comparator: Monetary<TAmount>];

//#endregion
//#region src/api/convert.d.ts
type ConvertParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>, newCurrency: Currency<TAmount>, rates: Rates<TAmount>];

//#endregion
//#region src/api/equal.d.ts
type EqualParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>, comparator: Monetary<TAmount>];

//#endregion
//#region src/api/greater-than.d.ts
type GreaterThanParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>, comparator: Monetary<TAmount>];

//#endregion
//#region src/api/greater-than-or-equal.d.ts
type GreaterThanOrEqualParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>, comparator: Monetary<TAmount>];

//#endregion
//#region src/api/has-sub-units.d.ts
type HasSubUnitsParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>];

//#endregion
//#region src/api/have-same-amount.d.ts
type HaveSameAmountParams<TAmount> = readonly [monetaryObjects: readonly Monetary<TAmount>[]];

//#endregion
//#region src/api/have-same-currency.d.ts
declare function haveSameCurrency$1<TAmount>(monetaryObjects: readonly Monetary<TAmount>[]): boolean;

//#endregion
//#region src/api/is-negative.d.ts
type IsNegativeParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>];

//#endregion
//#region src/api/is-positive.d.ts
type IsPositiveParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>];

//#endregion
//#region src/api/is-zero.d.ts
type IsZeroParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>];

//#endregion
//#region src/api/less-than.d.ts
type LessThanParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>, comparator: Monetary<TAmount>];

//#endregion
//#region src/api/less-than-or-equal.d.ts
type LessThanOrEqualParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>, comparator: Monetary<TAmount>];

//#endregion
//#region src/api/maximum.d.ts
type MaximumParams<TAmount> = readonly [monetaryObjects: readonly Monetary<TAmount>[]];

//#endregion
//#region src/api/minimum.d.ts
type MinimumParams<TAmount> = readonly [monetaryObjects: readonly Monetary<TAmount>[]];

//#endregion
//#region src/api/multiply.d.ts
type MultiplyParams<TAmount> = readonly [multiplicand: Monetary<TAmount>, multiplier: ScaledAmount<TAmount> | TAmount];

//#endregion
//#region src/api/normalize-scale.d.ts
type NormalizeScaleParams<TAmount> = readonly [monetaryObjects: readonly Monetary<TAmount>[]];

//#endregion
//#region src/api/subtract.d.ts
type SubtractParams<TAmount> = readonly [minuend: Monetary<TAmount>, subtrahend: Monetary<TAmount>];

//#endregion
//#region src/api/to-snapshot.d.ts
declare function toSnapshot$1<TAmount>(monetaryObject: Monetary<TAmount>): Monetary<TAmount>;

//#endregion
//#region src/api/transform-scale.d.ts
type TransformScaleParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>, newScale: TAmount, divide?: DivideOperation];

//#endregion
//#region src/api/trim-scale.d.ts
type TrimScaleParams<TAmount> = readonly [monetaryObject: Monetary<TAmount>];

//#endregion
//#region src/api-overrides/add.d.ts
/**
 * Add up the passed Monetary objects.
 *
 * @param augend - The Monetary object to add to.
 * @param addend - The Monetary object to add.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
declare function add<TAmount>(...[augend, addend]: AddParams<TAmount>): {
  amount: TAmount;
  currency: Currency<TAmount>;
  scale: TAmount;
};

//#endregion
//#region src/api-overrides/allocate.d.ts
/**
 * Distribute the amount of a Monetary object across a list of ratios.
 *
 * @param monetaryObject - The Monetary object to allocate from.
 * @param ratios - The ratios to allocate the amount to.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
declare function allocate<TAmount>(...[monetaryObject, ratios]: AllocateParams<TAmount>): {
  amount: TAmount;
  currency: Currency<TAmount>;
  scale: TAmount;
}[];

//#endregion
//#region src/api-overrides/compare.d.ts
/**
 * Compare the value of a Monetary object relative to another.
 *
 * @param monetaryObject - The Monetary object to compare.
 * @param comparator - The Monetary object to compare to.
 *
 * @returns One of -1, 0, or 1 depending on whether the first Monetary object is less than, equal to, or greater than the other.
 *
 * @public
 */
declare function compare<TAmount>(...[monetaryObject, comparator]: CompareParams<TAmount>): ComparisonOperator;

//#endregion
//#region src/api-overrides/convert.d.ts
/**
 * Convert a Monetary object to another currency.
 *
 * @param monetaryObject - The Monetary object to format.
 * @param newCurrency - The currency to convert to.
 * @param rates - The rates to convert with.
 *
 * @returns A converted Monetary object.
 *
 * @public
 */
declare function convert<TAmount>(...[monetaryObject, newCurrency, rates]: ConvertParams<TAmount>): {
  amount: TAmount;
  currency: Currency<TAmount>;
  scale: TAmount;
};

//#endregion
//#region src/api-overrides/equal.d.ts
/**
 * Check whether the value of a Monetary object is equal to another.
 *
 * @param monetaryObject - The first Monetary object to compare.
 * @param comparator - The second Monetary object to compare.
 *
 * @returns Whether the Monetary objects are equal.
 *
 * @public
 */
declare function equal<TAmount>(...[monetaryObject, comparator]: EqualParams<TAmount>): boolean;

//#endregion
//#region src/api-overrides/greater-than.d.ts
/**
 * Check whether the value of a Monetary object is greater than another.
 *
 * @param monetaryObject - The Monetary object to compare.
 * @param comparator - The Monetary object to compare to.
 *
 * @returns Whether the Monetary to compare is greater than the other.
 *
 * @public
 */
declare function greaterThan<TAmount>(...[monetaryObject, comparator]: GreaterThanParams<TAmount>): boolean;

//#endregion
//#region src/api-overrides/greater-than-or-equal.d.ts
/**
 * Check whether the value of a Monetary object is greater than or equal another.
 *
 * @param monetaryObject - The Monetary object to compare.
 * @param comparator - The Monetary object to compare to.
 *
 * @returns Whether the Monetary to compare is greater than or equal the other.
 *
 * @public
 */
declare function greaterThanOrEqual<TAmount>(...[monetaryObject, comparator]: GreaterThanOrEqualParams<TAmount>): boolean;

//#endregion
//#region src/api-overrides/has-sub-units.d.ts
/**
 * Check whether a Monetary object has minor currency units.
 *
 * @param monetaryObject - The Monetary object to check.
 *
 * @returns Whether the Monetary object has minor currency units.
 *
 * @public
 */
declare function hasSubUnits<TAmount>(...[monetaryObject]: HasSubUnitsParams<TAmount>): boolean;

//#endregion
//#region src/api-overrides/have-same-amount.d.ts
/**
 * Check whether a set of Monetary objects have the same amount.
 *
 * @param monetaryObjects - The Monetary objects to compare.
 *
 * @returns Whether the Monetary objects have the same amount.
 *
 * @public
 */
declare function haveSameAmount<TAmount>(...[monetaryObjects]: HaveSameAmountParams<TAmount>): boolean;

//#endregion
//#region src/api-overrides/have-same-currency.d.ts
/**
 * Check whether a set of Monetary objects have the same currency.
 *
 * @param monetaryObjects - The Monetary objects to compare.
 *
 * @returns Whether the Monetary objects have the same currency.
 *
 * @public
 */
declare const haveSameCurrency: typeof haveSameCurrency$1;

//#endregion
//#region src/api-overrides/is-negative.d.ts
/**
 * Check whether a Monetary object is negative.
 *
 * @param monetaryObject - The Monetary object to check.
 *
 * @returns Whether the Monetary object is negative.
 *
 * @public
 */
declare function isNegative<TAmount>(...[monetaryObject]: IsNegativeParams<TAmount>): boolean;

//#endregion
//#region src/api-overrides/is-positive.d.ts
/**
 * Check whether a Monetary object is positive.
 *
 * @param monetaryObject - The Monetary object to check.
 *
 * @returns Whether the Monetary object is positive.
 *
 * @public
 */
declare function isPositive<TAmount>(...[monetaryObject]: IsPositiveParams<TAmount>): boolean;

//#endregion
//#region src/api-overrides/is-zero.d.ts
/**
 * Check whether the value of a Monetary object is zero.
 *
 * @param monetaryObject - The Monetary object to check.
 *
 * @returns Whether the value of a Monetary object is zero.
 *
 * @public
 */
declare function isZero<TAmount>(...[monetaryObject]: IsZeroParams<TAmount>): boolean;

//#endregion
//#region src/api-overrides/less-than.d.ts
/**
 * Check whether the value of a Monetary object is lesser than another.
 *
 * @param monetaryObject - The Monetary object to compare.
 * @param comparator - The Monetary object to compare to.
 *
 * @returns Whether the Monetary to compare is lesser than the other.
 *
 * @public
 */
declare function lessThan<TAmount>(...[monetaryObject, comparator]: LessThanParams<TAmount>): boolean;

//#endregion
//#region src/api-overrides/less-than-or-equal.d.ts
/**
 * Check whether the value of a Monetary object is lesser than or equal to another.
 *
 * @param monetaryObject - The Monetary object to compare.
 * @param comparator - The Monetary object to compare to.
 *
 * @returns Whether the Monetary to compare is lesser than or equal to the other.
 *
 * @public
 */
declare function lessThanOrEqual<TAmount>(...[monetaryObject, comparator]: LessThanOrEqualParams<TAmount>): boolean;

//#endregion
//#region src/api-overrides/maximum.d.ts
/**
 * Get the greatest of the passed Monetary objects.
 *
 * @param monetaryObjects - The Monetary objects to maximum.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
declare function maximum<TAmount>(...[monetaryObjects]: MaximumParams<TAmount>): {
  amount: TAmount;
  currency: Currency<TAmount>;
  scale: TAmount;
};

//#endregion
//#region src/api-overrides/minimum.d.ts
/**
 * Get the lowest of the passed Monetary objects.
 *
 * @param monetaryObjects - The Monetary objects to minimum.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
declare function minimum<TAmount>(...[monetaryObjects]: MinimumParams<TAmount>): {
  amount: TAmount;
  currency: Currency<TAmount>;
  scale: TAmount;
};

//#endregion
//#region src/api-overrides/multiply.d.ts
/**
 * Multiply the passed Monetary object.
 *
 * @param multiplicand - The Monetary object to multiply.
 * @param multiplier - The number to multiply with.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
declare function multiply<TAmount>(...[multiplicand, multiplier]: MultiplyParams<TAmount>): {
  amount: TAmount;
  currency: Currency<TAmount>;
  scale: TAmount;
};

//#endregion
//#region src/api-overrides/normalize-scale.d.ts
/**
 * Normalize a set of Monetary objects to the highest scale of the set.
 *
 * @param monetaryObjects - The Monetary objects to normalize.
 *
 * @returns A new set of Monetary objects.
 *
 * @public
 */
declare function normalizeScale<TAmount>(...[monetaryObjects]: NormalizeScaleParams<TAmount>): Monetary<TAmount>[];

//#endregion
//#region src/api-overrides/subtract.d.ts
/**
 * Subtract the passed Monetary objects.
 *
 * @param minuend - The Monetary object to subtract from.
 * @param subtrahend - The Monetary object to subtract.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
declare function subtract<TAmount>(...[minuend, subtrahend]: SubtractParams<TAmount>): {
  amount: TAmount;
  currency: Currency<TAmount>;
  scale: TAmount;
};

//#endregion
//#region src/api-overrides/to-decimal.d.ts
declare function toDecimal<TAmount>(monetaryObject: Monetary<TAmount>): string;
declare function toDecimal<TAmount, TOutput>(monetaryObject: Monetary<TAmount>, transformer: Transformer<TAmount, TOutput, string>): TOutput;

//#endregion
//#region src/api-overrides/to-snapshot.d.ts
/**
 * Get a snapshot of a Monetary object.
 *
 * @param monetaryObject - The Monetary object to format.
 * @param transformer - A transformer function.
 *
 * @returns A snapshot of the object.
 *
 * @public
 */
declare const toSnapshot: typeof toSnapshot$1;

//#endregion
//#region src/api-overrides/to-units.d.ts
declare function toUnits<TAmount>(monetaryObject: Monetary<TAmount>): readonly TAmount[];
declare function toUnits<TAmount, TOutput>(monetaryObject: Monetary<TAmount>, transformer: Transformer<TAmount, TOutput, readonly TAmount[]>): TOutput;

//#endregion
//#region src/api-overrides/transform-scale.d.ts
/**
 * Transform a Monetary object to a new scale.
 *
 * @param monetaryObject - The Monetary object to transform.
 * @param newScale - The new scale.
 * @param divide - A custom divide function.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
declare function transformScale<TAmount>(...[monetaryObject, newScale, divide]: TransformScaleParams<TAmount>): {
  amount: TAmount;
  currency: Currency<TAmount>;
  scale: TAmount;
};

//#endregion
//#region src/api-overrides/trim-scale.d.ts
/**
 * Trim a Monetary object's scale as much as possible, down to the currency exponent.
 *
 * @param monetaryObject - The Monetary object which scale to trim.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
declare function trimScale<TAmount>(...[monetaryObject]: TrimScaleParams<TAmount>): Monetary<TAmount>;

//#endregion
//#region src/calculator-bigint/api/zero.d.ts
/**
 * Return zero as a bigint.
 *
 * @returns Zero as a bigint.
 */
declare function zero$2(): bigint;

//#endregion
//#region src/calculator-bigint/calculator.d.ts
declare const calculator: {
  add: BinaryOperation<bigint>;
  compare: BinaryOperation<bigint, ComparisonOperator>;
  decrement: UnaryOperation<bigint>;
  increment: UnaryOperation<bigint>;
  integerDivide: BinaryOperation<bigint>;
  modulo: BinaryOperation<bigint>;
  multiply: BinaryOperation<bigint>;
  power: BinaryOperation<bigint>;
  subtract: BinaryOperation<bigint>;
  zero: typeof zero$2;
};

//#endregion
//#region src/calculator-bigjs/api/zero.d.ts
/**
 * Returns a Big zero.
 *
 * @returns A Big zero.
 */
declare function zero$1(): Big$1;

//#endregion
//#region src/calculator-bigjs/calculator.d.ts
declare const calculator$1: {
  add: BinaryOperation<big_js31.BigConstructor.Big>;
  compare: BinaryOperation<big_js33.BigConstructor.Big, ComparisonOperator>;
  decrement: UnaryOperation<big_js36.Big>;
  increment: UnaryOperation<big_js38.Big>;
  integerDivide: BinaryOperation<big_js40.Big>;
  modulo: BinaryOperation<big_js42.BigConstructor.Big>;
  multiply: BinaryOperation<big_js44.BigConstructor.Big>;
  power: BinaryOperation<big_js46.BigConstructor.Big>;
  subtract: BinaryOperation<big_js48.BigConstructor.Big>;
  zero: typeof zero$1;
};

//#endregion
//#region src/calculator-number/api/zero.d.ts
/**
 * Return zero as a number.
 *
 * @returns Zero as a number.
 */
declare function zero(): number;

//#endregion
//#region src/calculator-number/calculator.d.ts
declare const calculator$2: {
  add: BinaryOperation<number>;
  compare: BinaryOperation<number, ComparisonOperator>;
  decrement: UnaryOperation<number>;
  increment: UnaryOperation<number>;
  integerDivide: BinaryOperation<number>;
  modulo: BinaryOperation<number>;
  multiply: BinaryOperation<number>;
  power: BinaryOperation<number>;
  subtract: BinaryOperation<number>;
  zero: typeof zero;
};

//#endregion
//#region src/divide/down.d.ts
/**
 * Divide and round down.
 *
 * Rounding down happens whenever the quotient is not an integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
declare const down: DivideOperation;

//#endregion
//#region src/divide/half-away-from-zero.d.ts
/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round away from zero.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
declare const halfAwayFromZero: DivideOperation;

//#endregion
//#region src/divide/half-down.d.ts
/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round down.
 *
 * Rounding down happens when:
 * - The quotient is half (e.g., -1.5, 1.5).
 * - The quotient is positive and less than half (e.g., 1.4).
 * - The quotient is negative and greater than half (e.g., -1.6).
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
declare const halfDown: DivideOperation;

//#endregion
//#region src/divide/half-even.d.ts
/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round to the nearest even integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
declare const halfEven: DivideOperation;

//#endregion
//#region src/divide/half-odd.d.ts
/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round to the nearest odd integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
declare const halfOdd: DivideOperation;

//#endregion
//#region src/divide/half-towards-zero.d.ts
/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round towards zero.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
declare const halfTowardsZero: DivideOperation;

//#endregion
//#region src/divide/half-up.d.ts
/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round up.
 *
 * Rounding up happens when:
 * - The quotient is half (e.g., -1.5, 1.5).
 * - The quotient is positive and greater than half (e.g., 1.6).
 * - The quotient is negative and less than half (e.g., -1.4).
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
declare const halfUp: DivideOperation;

//#endregion
//#region src/divide/up.d.ts
/**
 * Divide and round up.
 *
 * Rounding up happens whenever the quotient is not an integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
declare const up: DivideOperation;

//#endregion
//#region src/helpers/create-monetary.d.ts
type CreateMonetaryOptions<TAmount> = {
  readonly calculator: Calculator<TAmount>;
  readonly formatter?: Formatter<TAmount>;
  readonly onCreate?: (options: MonetaryOptions<TAmount>) => void;
};
/**
 * Create a Monetary factory function.
 *
 * Note: The calculator and formatter are no longer attached to the returned objects.
 * They are inferred from the amount type at operation time.
 */
declare function createMonetary<TAmount>({
  calculator: _calculator,
  onCreate,
  formatter: _formatter
}: CreateMonetaryOptions<TAmount>): ({
  amount,
  currency: {
    code,
    base,
    exponent
  },
  scale
}: MonetaryOptions<TAmount>) => Monetary<TAmount>;

//#endregion
//#region src/monetary.d.ts
/**
 * Create a Monetary object (serializable POJO).
 *
 * @param options.amount - The amount in minor currency units.
 * @param options.currency - The currency.
 * @param options.scale - The number of decimal places to represent.
 *
 * @returns The created Monetary object (plain data, fully serializable).
 *
 * @public
 */
declare function monetary<TAmount = number>(options: MonetaryOptions<TAmount>): Monetary<TAmount>;

//#endregion
export { AED, AFN, ALL, AMD, ANG, AOA, ARS, AUD, AWG, AZN, BAM, BBD, BDT, BGN, BHD, BIF, BMD, BND, BOB, BOV, BRL, BSD, BTN, BWP, BYN, BZD, CAD, CDF, CHE, CHF, CHW, CLF, CLP, CNY, COP, COU, CRC, CUC, CUP, CVE, CZK, Calculator, ComparisonOperator, Currency, DJF, DKK, DOP, DZD, DivideOperation, EGP, ERN, ETB, EUR, FJD, FKP, Formatter, GBP, GEL, GHS, GIP, GMD, GNF, GTQ, GYD, HKD, HNL, HRK, HTG, HUF, IDR, ILS, INR, IQD, IRR, ISK, JMD, JOD, JPY, KES, KGS, KHR, KMF, KPW, KRW, KWD, KYD, KZT, LAK, LBP, LKR, LRD, LSL, LYD, MAD, MDL, MGA, MKD, MMK, MNT, MOP, MRU, MUR, MVR, MWK, MXN, MXV, MYR, MZN, Monetary, MonetaryFactory, MonetaryOptions, MonetarySnapshot, NAD, NGN, NIO, NOK, NPR, NZD, OMR, PAB, PEN, PGK, PHP, PKR, PLN, PYG, QAR, RON, RSD, RUB, RWF, Rates, SAR, SBD, SCR, SDG, SEK, SGD, SHP, SLL, SOS, SRD, SSP, STN, SVC, SYP, SZL, ScaledAmount, THB, TJS, TMT, TND, TOP, TRY, TTD, TWD, TZS, Transformer, UAH, UGX, USD, USN, UYI, UYU, UYW, UZS, VES, VND, VUV, WST, XAF, XCD, XOF, XPF, YER, ZAR, ZMW, ZWL, add, allocate, calculator as bigintCalculator, calculator$1 as bigjsCalculator, compare, convert, createMonetary, down, equal, greaterThan, greaterThanOrEqual, halfAwayFromZero, halfDown, halfEven, halfOdd, halfTowardsZero, halfUp, hasSubUnits, haveSameAmount, haveSameCurrency, isNegative, isPositive, isZero, lessThan, lessThanOrEqual, maximum, minimum, monetary, multiply, normalizeScale, calculator$2 as numberCalculator, subtract, toDecimal, toSnapshot, toUnits, transformScale, trimScale, up };