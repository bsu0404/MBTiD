import Slider from "react-slider";
import "./mbtiTestTemplate.scss";
interface MbtiTestTemplateProps {
  ei: number;
  setEi: (value: number) => void;
  sn: number;
  setSn: (value: number) => void;
  tf: number;
  setTf: (value: number) => void;
  pj: number;
  setPj: (value: number) => void;
}

const MbtiTestTemplate = ({
  ei,
  setEi,
  sn,
  setSn,
  tf,
  setTf,
  pj,
  setPj,
}: MbtiTestTemplateProps) => {
  return (
    <>
      <div className="f-title1 title2">
        🔎
        <br />
        나의 MBTI를 입력해주세요.
      </div>
      <div className="mbti-wrapper f-title2">
        <div className="mbti-box">{ei == 50 ? "" : ei > 50 ? "E" : "I"}</div>
        <div className="mbti-box">{sn == 50 ? "" : sn > 50 ? "S" : "N"}</div>
        <div className="mbti-box">{tf == 50 ? "" : tf > 50 ? "T" : "F"}</div>
        <div className="mbti-box">{pj == 50 ? "" : pj > 50 ? "P" : "J"}</div>
      </div>
      <div className="slider-wrapper f-caption">
        <p>I</p>
        <div className="slider-container">
          <Slider
            min={1}
            max={100}
            value={ei}
            onChange={setEi}
            className="slider"
            thumbClassName="thumb"
            trackClassName="track"
          />
          <div className="percentage" style={{ left: `calc(${ei}% - 15px)` }}>
            {ei > 50 ? ei : 100 - ei}%
          </div>
        </div>
        <p>E</p>
      </div>
      <div className="slider-wrapper f-caption">
        <p>N</p>
        <div className="slider-container">
          <Slider
            min={1}
            max={100}
            value={sn}
            onChange={setSn}
            className="slider"
            thumbClassName="thumb"
            trackClassName="track"
          />
          <div className="percentage" style={{ left: `calc(${sn}% - 15px)` }}>
            {sn > 50 ? sn : 100 - sn}%
          </div>
        </div>
        <p>S</p>
      </div>
      <div className="slider-wrapper f-caption">
        <p>F</p>
        <div className="slider-container">
          <Slider
            min={1}
            max={100}
            value={tf}
            onChange={setTf}
            className="slider"
            thumbClassName="thumb"
            trackClassName="track"
          />
          <div className="percentage" style={{ left: `calc(${tf}% - 15px)` }}>
            {tf > 50 ? tf : 100 - tf}%
          </div>
        </div>
        <p>T</p>
      </div>
      <div className="slider-wrapper f-caption">
        <p>J</p>
        <div className="slider-container">
          <Slider
            min={1}
            max={100}
            value={pj}
            onChange={setPj}
            className="slider"
            thumbClassName="thumb"
            trackClassName="track"
          />
          <div
            className="percentage f-caption"
            style={{ left: `calc(${pj}% - 15px)` }}
          >
            {pj > 50 ? pj : 100 - pj}%
          </div>
        </div>
        <p>P</p>
      </div>
    </>
  );
};
export default MbtiTestTemplate;
