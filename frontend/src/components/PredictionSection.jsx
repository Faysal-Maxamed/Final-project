import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Loader } from "lucide-react";
import { predictReadmission } from "../api";

ChartJS.register(ArcElement, Tooltip, Legend);

const PredictionSection = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    primary_diagnosis: "",
    num_procedures: "",
    days_in_hospital: "",
  });

  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const primaryDiagnoses = [
    "Depressed Skull Fracture",
    "Abdominal Injury",
    "Open Femur Fracture",
    "Multiple Injury",
    "Diabetic Foot Gangrene",
    "Left Hand Fingers Injury",
    "Right Wrist Injury",
    "Left Toe Infected Wound",
    "Soft Tissue Injury Right Ankle Fracture",
    "Left Ankle Joint"
  ];

  const adviceMap = {
    0: {
      yes: "➤ Ku daawee isbitaalka si degdeg ah – dhaawac maskaxeed ayaa ka dhalan kara haddii aan la daaweyn.\nKa fogow dhaqdhaqaaqyada culus ama madaxa saameyn kara – u ogolow dhaawaca inuu bogsado.\nRaac dhammaan talooyinka dhakhtarka ee ku saabsan raajada (CT/MRI) iyo baaritaanka maskaxda.",
      no: "➤ \nXidho koofiyad ama qalab ilaalin marka aad fuushan tahay mooto ama ciyaar halis ah.\nKa fogow shilalka madaxa adigoo taxaddar u leh deegaankaaga.\nCun cunto nafaqo leh oo kor u qaada caafimaadka lafaha (kalsiyum & vitamin D)."
    },
    1: {
      yes: "➤ Iska ilaali cunista cunto culus ama bararin karta caloosha – u raac cunto jilicsan.\nQabow ama baraf mari meelaha bararsan si loo yareeyo bararka.\nHaddii uu dhiigbax jiro ama caloosha laga dareemayo culays, u tag dhakhtar si degdeg ah.",
      no: "➤ Cunto caafimaad leh ku dadaal: khudaar, miraha iyo biyo badan.\nJimicsi fudud si caloosha u shaqeyso si fiican (yoga ama socod).\nKa fogow cabitaanka badan ee sonkorta leh ama keena calool-xanuunka."
    },
    2: {
      yes: "➤ Waa xaalad degdeg ah – u baahan qalliin iyo dawooyin ka hortaga caabuqa (antibiotics).\nKa ilaali meesha dhaawaca in lagu cadaadiyo ama la dhaqaajiyo si khaldan.\nKu dadaal inaad ilaaliso nadaafadda meesha dhaawaca si caabuq uga hortagto.",
      no: "➤ Xooji lafahaaga adoo cunaya cunto leh kalsiyum iyo fitamiin D (caano, kalluun).\nKa fogow dhacdooyinka sababi kara jabka lafaha sida siibasho ama shil.\nSamee jimicsi kor u qaada xoogga lafaha iyo murqaha lugaha."
    },
    3: {
      yes: "➤ Qiimeyn guud (full assessment) baa loo baahan yahay – dhaawac kasta si gooni ah ayaa loo eegaa.\nSug xasilloonida qofka (neefsashada, dhiig-karka, garaaca wadnaha) ka hor inta aan la daweyn.\nU gudub isbitaalka si degdeg ah oo u ogolow koox caafimaad inay la wareegaan xaaladda.",
      no: "➤ Ka fogow meelaha khatarta leh iyo dhacdooyinka dhaawaca keeni kara (shilal, dagaal).\nXidho qalabka badbaadada (helmet, suunka baabuurka, iwm).\nBaro badbaadada xaaladaha degdega ah si aad u samatabbixiso naftaada iyo dadka kale."
    },
    4: {
      yes: "➤ Isla markiiba hel daryeel caafimaad si loo joojiyo faafidda caabuqa ama dhaawaca.\nKa fogow cadaadiska lugta – isticmaal kabo gaar ah ama sariiro gaar ah.\nIska hubi sonkorta dhiigga si joogto ah – sonkorta aan xakameysneyn waa sababta ugu weyn.",
      no: "➤ Haddii aad leedahay sonkorow, hubi cagahaaga maalin kasta si aad u ogaato dhaawacyo.\nXidho kabo raaxo leh oo aan cidhibta ka cadaadin.\nIska jar cidiyaha si sax ah, una tag daryeelka cagaha haddii aad la tacaaleyso cillado."
    },
    5: {
      yes: "➤ Qabow mari si bararka u yaraado, kadibna ku duub si aan dhaqaaq lahayn.\nU tag xarun caafimaad si loo hubiyo in aysan jirin jab ama dhaawac neerfaha.\nIsticmaal daawo xanuunka yareysa haddii ay jirto xanuun daran.",
      no: "➤ Ka taxaddar markaad isticmaaleyso qalabka goynta ama garaacista.\nKu shaqee gacmahaaga xaalad fayo qab leh (gloves haddii loo baahdo).\nSamee jimicsi fudud oo faraha ah si murqaha faraha u xoogeeyaan."
    },
    6: {
      yes: "➤ Dhig baraf 15 daqiiqo kasta 2 saacadood gudahood si bararka loo yareeyo.\nXiro garab-gacneed (wrist brace) si aad u ilaaliso booska.\nHaddii xanuunku socdo ama dhaqaaq la'aan jirto, tag dhakhtar si loo baaro xanuunka.",
      no: "➤ Ha culayn curcurka markaad shaqo adag qabaneyso.\nSamee xoogsi curcurka ah si aad u ilaaliso xoogga muruqyada iyo kala-goysyada.\nKa fogow dhicitaanka ama istaagista khaldan ee dhaawac keeni karta."
    },
    7: {
      yes: "➤ Nadiifi dhaawaca maalin kasta adigoo isticmaalaya biyo nadiif ah iyo antiseptic.\nXidho kabaha furan ama ku habboon si aysan dhaawaca u cadaadin.\nHaddii caabuq uu sii bato ama guduud uu faafayo – hel antibiyootiko degdeg ah.",
      no: "➤ Ka ilaali cagaha dhaawac – ka fogow kabaha cidhiidhi ah ama wax gooya.\nHaddii aad is gooyso, si fiican u nadiifi una duub.\nCagaha si joogto ah u daryeel – jar cidiyaha, nadiifi, una isticmaal saabuun nadiif ah."
    },
    8: {
      yes: "➤ Ka naso lugta dhaawacan, dhigo meel sare si bararka loo yareeyo.\nKu duub kabaha ama isbuunyada si aad u yarayso dhaqdhaqa.\nU tag dhakhtar si loo baaro jabka iyo murqaha ku hareeraysan.",
      no: "➤ Samee jimicsi dabacsan si adigoo istaagsan ugu xoogeeyo canqowga.\nHa qaadin culays aad u badan – gaar ahaan hadduu canqowga daciif yahay.\nKa taxaddar meelaha siibashada leh (dhoobo, baraf, roob)."
    },
    9: {
      yes: "➤ Dhig baraf si loo yareeyo bararka; u daa si degdeg ah haddii dhaqdhaqaaq xanuun badan keeno.\nKu duub canqowga si uu u nasto – ha socon badan inta uu dhaawaca jiro.\nTag xarun caafimaad haddii dhaawacu socdo muddo dheer ama dabcisnimo dareento.",
      no: "➤ Samee jimicsi canqowga xoojinaya sida wareejin, istaag hal lug ah, iwm.\nXidho kabaha taageera canqowga, gaar ahaan markaad ordayso ama soconayso.\nHa fadhiisan muddo dheer – socodku wuu wanaagsan yahay haddii aadan dhaawac qabin."
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const preparedData = {
      Age: Number(formData.age),
      Gender: formData.gender === "Male" ? 1 : 0,
      Primary_Diagnosis: Number(formData.primary_diagnosis),
      'Number of Procedures': Number(formData.num_procedures),
      'Days in Hospital': Number(formData.days_in_hospital),
    };

    try {
      // Use the predictReadmission function from api.js
      const result = await predictReadmission(preparedData);
      
      if (!result) {
        throw new Error("Failed to get prediction result");
      }
      
      setResult(result);
      setShowModal(true);

      // Set advice
      const diagnosisIndex = Number(formData.primary_diagnosis);
      const selectedAdvice = result.readmission === 1 ? adviceMap[diagnosisIndex].yes : adviceMap[diagnosisIndex].no;
      setAdvice(selectedAdvice);

      if (result && !result.error) {
        // Get the diagnosis text from the index
        const diagnosisText = primaryDiagnoses[formData.primary_diagnosis];
        
        const historyEntry = {
          age: formData.age,
          gender: formData.gender,
          primary_diagnosis: diagnosisText,
          discharge_to: "Home", // Default value since not collected in form
          num_procedures: formData.num_procedures,
          days_in_hospital: formData.days_in_hospital,
          comorbidity_score: "0", // Default value since not collected in form
          readmission: result.readmission === 1 ? "Yes" : "No",
          probability: `${(result.probability * 100).toFixed(2)}%`,
        };

        try {
          const historyResponse = await fetch("http://localhost:5000/api/patient/history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(historyEntry),
          });

          if (!historyResponse.ok) {
            console.error("Failed to save history:", await historyResponse.text());
          } else {
            console.log("History saved successfully");
          }
        } catch (historyError) {
          console.error("Error saving history:", historyError);
        }
      }
    } catch (error) {
      console.error("Error making prediction:", error);
      alert("Prediction failed. Please try again.");
    } finally {
      setIsLoading(false);
    }

    setFormData({
      age: "",
      gender: "",
      primary_diagnosis: "",
      num_procedures: "",
      days_in_hospital: "",
    });
  };

  const handleRatingClick = (emoji) => {
    setRating(emoji);
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback || !rating) {
      alert("Please provide both feedback and a rating.");
      return;
    }

    const feedbackData = {
      feedback,
      rating,
      timestamp: new Date(),
    };

    await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedbackData),
    });

    setFeedback("");
    setRating("");
    alert("Feedback submitted. Thank you!");
  };

  const chartData = {
    labels: ["Readmitted", "Not Readmitted"],
    datasets: [
      {
        data: [
          result?.readmission === 1
            ? result?.probability * 100
            : 100 - result?.probability * 100,
          result?.readmission === 0
            ? result?.probability * 100
            : 100 - result?.probability * 100,
        ],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF4384", "#2A91D3"],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M9 12h6"></path>
              <path d="M12 9v6"></path>
              <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Readmission Predictor</h2>
        </div>
        <div className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">Healthcare Tool</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">AGE</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">GENDER</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">PRIMARY DIAGNOSIS</label>
            <select
              name="primary_diagnosis"
              value={formData.primary_diagnosis}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            >
              <option value="">Select Diagnosis</option>
              {primaryDiagnoses.map((diag, i) => (
                <option key={i} value={i}>{diag}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">NUMBER OF PROCEDURES</label>
            <input
              type="number"
              name="num_procedures"
              value={formData.num_procedures}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">DAYS IN HOSPITAL</label>
            <input
              type="number"
              name="days_in_hospital"
              value={formData.days_in_hospital}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader size={20} className="animate-spin mr-2" />
              Processing...
            </>
          ) : (
            "Predict Readmission"
          )}
        </button>
      </form>

      {/* Modal */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 rounded-lg w-full max-w-lg bg-white text-black">
            <h2 className="text-xl font-bold mb-4 text-center">Prediction Result</h2>
            <div className="flex justify-center mt-4 relative">
              <div className="w-48 h-48">
                <Pie data={chartData} options={{ plugins: { legend: { display: true } } }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                {(result.probability * 100).toFixed(2)}%
              </div>
            </div>
            <p className="text-center mt-4">
              Readmission: <strong>{result.readmission === 1 ? "Yes" : "No"}</strong>
            </p>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold text-center mb-2">Advice:</p>
              <p className="whitespace-pre-line">{advice}</p>
            </div>

            <div className="mt-4 text-center">
              <h4 className="font-medium">Rate our Prediction</h4>
              <div className="flex justify-center space-x-2 mt-2">
                {["😡", "😞", "😐", "😊", "😀"].map((emoji, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleRatingClick(emoji)} 
                    className={`text-2xl p-2 rounded-full ${rating === emoji ? 'bg-indigo-100' : ''}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="4"
                placeholder="Write your feedback here..."
                className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-200"
              />
              <button
                onClick={handleFeedbackSubmit}
                className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
              >
                Submit Feedback
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionSection; 