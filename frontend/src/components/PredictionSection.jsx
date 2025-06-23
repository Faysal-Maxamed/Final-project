import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import { predictReadmission } from "../api";
import Header from "./header";

ChartJS.register(ArcElement, Tooltip, Legend);

// Simple rating mapping: emoji -> number
const ratingMap = [
  "😡", // Very Bad
  "😞", // Bad  
  "😐",  // Neutral
  "😊",  // Good
  "😀",  // Very Good
];

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
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

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
      const result = await predictReadmission(preparedData);
      
      if (!result) {
        throw new Error("Failed to get prediction result");
      }
      
      setResult(result);
      setShowModal(true);

      const diagnosisIndex = Number(formData.primary_diagnosis);
      const selectedAdvice = result.readmission === 1 ? adviceMap[diagnosisIndex].yes : adviceMap[diagnosisIndex].no;
      setAdvice(selectedAdvice);

      if (result && !result.error) {
        const diagnosisText = primaryDiagnoses[formData.primary_diagnosis];
        
        const historyEntry = {
          age: formData.age,
          gender: formData.gender,
          primary_diagnosis: diagnosisText,
          discharge_to: "Home",
          num_procedures: formData.num_procedures,
          days_in_hospital: formData.days_in_hospital,
          comorbidity_score: "0",
          readmission: result.readmission === 1 ? "Yes" : "No",
          probability: `${(result.probability * 100).toFixed(2)}%`,
        };

        try {
          const token = localStorage.getItem("token");
          const historyResponse = await fetch("http://localhost:5000/api/patient/history", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
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

    if (!ratingMap.includes(rating)) {
      alert("Invalid rating selected.");
      return;
    }

    const feedbackData = {
      feedback,
      rating: rating,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit feedback.");
      }

      alert("Feedback submitted successfully. Thank you!");
      setFeedback("");
      setRating("");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert(err.message);
    }
  };

  const chartData = {
    labels: ["Readmitted Patient", "Not Readmitted"],
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
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />


        {/* Modern background image section */}
        <div className="relative min-h-[350px] flex items-center justify-center bg-gradient-to-tr from-indigo-200 via-blue-100 to-emerald-100  overflow-hidden mb-10">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80" alt="Hospital" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="relative z-10 w-full max-w-lg px-6 py-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-8 text-center drop-shadow-lg">Patient Readmission Prediction</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center justify-center bg-white bg-opacity-90 rounded-md shadow-xl p-6 md:p-8">
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="0"
                  className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition text-base"
                  placeholder="Age"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition text-base"
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold text-gray-700 mb-1">Primary Diagnosis</label>
                <select
                  name="primary_diagnosis"
                  value={formData.primary_diagnosis}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition text-base"
                >
                  <option value="">Diagnosis</option>
                  {primaryDiagnoses.map((diag, i) => (
                    <option key={i} value={i}>{diag}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold text-gray-700 mb-1">Procedures</label>
                <input
                  type="number"
                  name="num_procedures"
                  value={formData.num_procedures}
                  onChange={handleChange}
                  required
                  min="0"
                  className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 transition text-base"
                  placeholder="#"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-xs font-semibold text-gray-700 mb-1">Days in Hospital</label>
                <input
                  type="number"
                  name="days_in_hospital"
                  value={formData.days_in_hospital}
                  onChange={handleChange}
                  required
                  min="0"
                  className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition text-base"
                  placeholder="Days"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full bg-gradient-to-r from-indigo-500 to-emerald-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:from-indigo-600 hover:to-emerald-500 transition-all duration-300 flex items-center justify-center text-lg focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader size={22} className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Predict"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Modal */}
        {showModal && result && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Prediction Result
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-6">
                  {/* Left side: Chart and summary */}
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl">
                    <div className="relative w-48 h-48">
                      <Pie
                        data={chartData}
                        options={{
                          plugins: { legend: { display: false } },
                          cutout: "70%",
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-4xl font-bold text-gray-800">
                          {(result.probability * 100).toFixed(1)}%
                        </span>
                        <span className="text-sm text-gray-500">
                          Probability
                        </span>
                      </div>
                    </div>
                    <div
                      className={`mt-6 py-2 px-6 rounded-full text-lg font-semibold ${
                        result.readmission === 1
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {result.readmission === 1 ? "Readmitted Patient" : "Not Readmitted"}
                    </div>
                  </div>

                  {/* Right side: Advice */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-inner">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-green-200 rounded-full mr-3">
                        <svg
                          className="w-5 h-5 text-green-700"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="font-bold text-lg text-gray-800">
                        Recommendations
                      </h3>
                    </div>
                    <div className="text-sm text-gray-700 space-y-3">
                      {advice
                        .split("\n")
                        .map((line) => line.replace("➤", "").trim())
                        .filter((line) => line)
                        .map((line, index) => (
                          <div key={index} className="flex items-start">
                            <svg
                              className="w-5 h-5 mr-2.5 text-green-500 flex-shrink-0 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <span>{line}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback section */}
              <div className="bg-gray-100/70 p-8">
                <h3 className="font-bold text-lg text-gray-800 mb-4 text-center">
                  Rate this Prediction
                </h3>
                <div className="flex justify-center space-x-4">
                  {ratingMap.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleRatingClick(emoji)}
                      className={`text-4xl p-2 rounded-full transition-all duration-200 transform hover:scale-125 ${
                        rating === emoji
                          ? "bg-indigo-200/80 ring-2 ring-indigo-400 scale-125"
                          : "hover:bg-gray-200/80"
                      }`}
                      title={`Rating: ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                {rating && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows="3"
                      placeholder="Tell us what you think..."
                      className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300 transition"
                    />
                    <button
                      onClick={handleFeedbackSubmit}
                      className="mt-3 w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400"
                    >
                      Submit Feedback
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
    </div>
  );
};

export default PredictionSection; 