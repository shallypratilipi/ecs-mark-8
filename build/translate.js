const translation = [
     {
       "FIELD1": "Sl. No.",
       "FIELD2": "English Text",
       "FIELD3": "Context",
       "HINDI": "Hindi",
       "BENGALI": "Bengali",
       "GUJARATI": "Gujarati",
       "MARATHI": "Marathi",
       "KANNADA": "Kannada",
       "MALAYALAM": "Malayalam",
       "TAMIL": "Tamil",
       "TELUGU": "Telugu"
     },
     {
       "FIELD1": "18",
       "FIELD2": "Level {{ levelNumber }}",
       "FIELD3": "Whenever you read a certain number of books, you reach a certain level",
       "HINDI": "लेवल {{ levelNumber }}",
       "BENGALI": "লেবেল {{ levelNumber }}",
       "GUJARATI": "લેવલ {{ levelNumber }}",
       "MARATHI": "स्तर  {{ levelNumber }}",
       "KANNADA": "ಹಂತ {{levelNumber}}",
       "MALAYALAM": "ലെവല്‍ {{levelNumber}}",
       "TAMIL": "படிநிலை {{ levelNumber }}",
       "TELUGU": "లెవెల్ {{ levelNumber }}"
     },
     {
       "FIELD1": "19",
       "FIELD2": "Read {{ readCount }} many contents to reach level {{ levelNumber }}",
       "FIELD3": "This will be below your level",
       "HINDI": "लेवल {{ levelNumber }} पाने के लिए {{ readCount }} रचनायें पढ़ें",
       "BENGALI": "লেবেল {{ levelNumber }} প্রাপ্ত করতে গেলে {{ readCount }} রচনা পড়ুন",
       "GUJARATI": "વાંચન-લેવલ {{ levelNumber }} પર પહોંચવા માટે વધું {{ readCount }} રચનાઓ વાંચો. ",
       "MARATHI": "{{ levelNumber }} स्तरावर पोचण्याकरता आणखीन {{ readCount }} कथा वाचा!  ",
       "KANNADA": "{{ levelNumber }} ನೇ  ಹಂತವನ್ನು ತಲುಪಲು {{ readCount }} ಬರಹಗಳನ್ನು ಓದಿ",
       "MALAYALAM": "{{ levelNumber }}ല്‍ പ്രവേശിക്കാന്‍ {{readCount}} രചനകള്‍ കൂടി വായിക്കൂ ",
       "TAMIL": "படிநிலை {{ levelNumber }} -க்கு செல்ல இன்னும் {{ readCount }} புத்தகங்கள் படிக்கவேண்டும்",
       "TELUGU": "లెవెల్ {{ levelNumber }} పొందడానికీ {{ readCount }} రచనలు చదవండి"
     },
     {
       "FIELD1": "20",
       "FIELD2": "Explore contents",
       "FIELD3": "",
       "HINDI": "रचनायें खोजें ",
       "BENGALI": "রচনা খুঁজুন",
       "GUJARATI": "રચનાઓ શોધો ",
       "MARATHI": "अधिक साहित्य वाचा",
       "KANNADA": "ಹೆಚ್ಚು ಬರಹಗಳನ್ನು ಓದಿರಿ ",
       "MALAYALAM": "രചനകള്‍ കണ്ടെത്തി വായിക്കൂ ",
       "TAMIL": "படைப்புகளைக் கண்டடையுங்கள்",
       "TELUGU": "రచనలు అన్వేషించండి"
     },
     {
       "FIELD1": "21",
       "FIELD2": "Read Levels",
       "FIELD3": "Heading for the section showing user's current level",
       "HINDI": "रीडिंग लेवल ",
       "BENGALI": "রিডিং লেবেল",
       "GUJARATI": "વાંચન-લેવલ  ",
       "MARATHI": "वाचन स्तर",
       "KANNADA": "ಓದುವಿಕೆಯ ಹಂತಗಳು ",
       "MALAYALAM": "വായനാ ലെവലുകള്‍ ",
       "TAMIL": "வாசிப்புப் படிநிலைகள்",
       "TELUGU": "రీడింగ్ లెవెల్ "
     },
     {
       "FIELD1": "22",
       "FIELD2": "More levels coming soon, keep reading!",
       "FIELD3": "",
       "HINDI": "और रीडिंग लेवल जल्दी ही आ रहे हैं,पढ़ना जारी रखें!",
       "BENGALI": "আরও রিডিং লেবেল শীঘ্রই আসছে,পড়তে থাকুন!",
       "GUJARATI": "અમે વધુ વાંચન-લેવલ લાવી રહ્યા છીએ. વાંચતા રહેશો. ",
       "MARATHI": "लवकरच आम्ही आणखीन स्तर घेऊन येत आहोत. वाचत राहा!",
       "KANNADA": "ಹೆಚ್ಚಿನ ಓದುವಿಕೆಯಿಂದ ಮುಂದಿನ ಹಂತಗಳನ್ನು ತಲುಪಿರಿ!",
       "MALAYALAM": "കൂടുതല്‍ ലെവലുകള്‍ ഉടന്‍ വരുന്നൂ, വായന തുടരുക !",
       "TAMIL": "இன்னும் நிறைய படிநிலைகள் வரவிருக்கின்றன. தொடர்ந்து வாசியுங்கள்!",
       "TELUGU": "మరిన్ని లెవెల్స్ త్వరలో వస్తున్నాయి, చదవడం కొనసాగించండి!"
     },
     {
       "FIELD1": "23",
       "FIELD2": "Congratulations!",
       "FIELD3": "",
       "HINDI": "बधाई!",
       "BENGALI": "অভিনন্দন!",
       "GUJARATI": "અભિનંદન!",
       "MARATHI": "अभिनंदन!",
       "KANNADA": "ಅಭಿನಂದನೆಗಳು!",
       "MALAYALAM": "അഭിനന്ദനങ്ങള്‍!",
       "TAMIL": "வாழ்த்துக்கள்!",
       "TELUGU": "అభినందనలు!"
     },
     {
       "FIELD1": "24",
       "FIELD2": "You reached level {{ levelNumber }}",
       "FIELD3": "",
       "HINDI": "आप रीडिंग लेवल {{leavelnumber}} पर पहुँचे हैं ",
       "BENGALI": "আপনি রিডিং লেবেল {{ levelNumber }} অবধি পৌঁছেছেন",
       "GUJARATI": "આપે {{ levelNumber }} લેવલ પ્રાપ્ત કર્યું છે. ",
       "MARATHI": "आपण {{ levelNumber }} स्तरावर पोहोचलात ",
       "KANNADA": "ನೀವು {{ levelNumber }} ಹಂತವನ್ನು ತಲುಪಿದ್ದೀರಾ",
       "MALAYALAM": "താങ്കള്‍ {{ levelNumber }}ല്‍ പ്രവേശിച്ചിരിക്കുന്നു ",
       "TAMIL": "நீங்கள் படிநிலை {{ levelNumber }}-ஐ அடைந்துவிட்டீர்கள்",
       "TELUGU": "మీరు లెవెల్ {{level number}} ను చేరుకున్నారు"
     },
     {
       "FIELD1": "25",
       "FIELD2": "Keep Reading!",
       "FIELD3": "",
       "HINDI": "पढना जारी रखें!",
       "BENGALI": "পড়ুতে থাকুন!",
       "GUJARATI": "વાંચતા રહો!",
       "MARATHI": "वाचत राहा!",
       "KANNADA": "ಓದನ್ನು ಮುಂದುವರೆಸಿ!",
       "MALAYALAM": "തുടര്‍ന്നും വായിക്കൂ ! ",
       "TAMIL": "தொடர்ந்து வாசியுங்கள்!",
       "TELUGU": "చదువుతూ ఉండండి "
     },
     {
       "FIELD1": "26",
       "FIELD2": "Login to save your progress",
       "FIELD3": "Sign in button in levels, insisting users to login in order to save progress",
       "HINDI": "अपनी प्रगति को सहेजने के लिये लॉग इन करें ",
       "BENGALI": "আপনার অগ্রগতি সংরক্ষণ করতে হলে লগ-ইন করুন",
       "GUJARATI": "આપની ગતિવિધિ સેવ કરવા માટે લોગઈન કરો",
       "MARATHI": "आपला स्तरांचा उत्कर्ष जतन करण्यासाठी लॉग इन करा ",
       "KANNADA": "ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಸೇವ್ ಮಾಡಲು ಲಾಗಿನ್ ಆಗಿರಿ",
       "MALAYALAM": "താങ്കളുടെ നേട്ടങ്ങള്‍ സേവ് ആകണമെങ്കില്‍ ലോഗിന്‍ ചെയ്യൂ ",
       "TAMIL": "உங்களது படிநிலைகளை சேமிக்க லாக்-இன் செய்யவும்",
       "TELUGU": "మీ పురోగతి సేవ్ చేయడానికి లాగిన్ అవ్వండి "
     }
]

const translationObj = {
    "HINDI": {},
    "BENGALI": {},
    "GUJARATI": {},
    "MARATHI": {},
    "KANNADA": {},
    "MALAYALAM": {},
    "TAMIL": {},
    "TELUGU": {}
}

translation.forEach((eachTran, index) => {
    if (index === 0) {
        return;
    }

    translationObj['HINDI']['reader_gamify_' + eachTran.FIELD2.toLowerCase().split(' ').join('_')] = eachTran.HINDI
    translationObj['BENGALI']['reader_gamify_' + eachTran.FIELD2.toLowerCase().split(' ').join('_')] = eachTran.BENGALI
    translationObj['GUJARATI']['reader_gamify_' + eachTran.FIELD2.toLowerCase().split(' ').join('_')] = eachTran.GUJARATI
    translationObj['MARATHI']['reader_gamify_' + eachTran.FIELD2.toLowerCase().split(' ').join('_')] = eachTran.MARATHI
    translationObj['KANNADA']['reader_gamify_' + eachTran.FIELD2.toLowerCase().split(' ').join('_')] = eachTran.KANNADA
    translationObj['MALAYALAM']['reader_gamify_' + eachTran.FIELD2.toLowerCase().split(' ').join('_')] = eachTran.MALAYALAM
    translationObj['TAMIL']['reader_gamify_' + eachTran.FIELD2.toLowerCase().split(' ').join('_')] = eachTran.TAMIL
    translationObj['TELUGU']['reader_gamify_' + eachTran.FIELD2.toLowerCase().split(' ').join('_')] = eachTran.TELUGU
})

console.log(translationObj);
