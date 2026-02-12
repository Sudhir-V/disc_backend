const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User.model');
const connectDB = require('./config/db');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });
connectDB();

// ==========================================================
// PASTE YOUR USERS HERE
// ==========================================================
// You can add one user or multiple users.
// Required: phone
// Optional: name, email, gender, employeeId, isAdmin (defaults to false)
//
// Example:
// const users = [
//     { name: "John Doe", email: "john@example.com", phone: "1234567890", gender: "Male", employeeId: "EMP001" },
//     { name: "Jane Doe", email: "jane@example.com", phone: "0987654321", gender: "Female", isAdmin: true, employeeId: "EMP002" }
// ];

const users = [
    {
        "employeeId": "PEN751",
        "name": "Sangeetha Sampath",
        "email": "sangeetha@team.thepenindia.com",
        "gender": "Female",
        "phone": "9962883341"
    },
    {
        "employeeId": "PEN726",
        "name": "C Senthamizharasan",
        "email": "senthamizharasan@thepenindia.com",
        "gender": "Male",
        "phone": "7418279380"
    },
    {
        "employeeId": "PEN504",
        "name": "Christopher Selvam",
        "email": "christopher@thepenindia.com",
        "gender": "Male",
        "phone": "9840843567"
    },
    {
        "employeeId": "PEN138",
        "name": "Janaki Sathishkumar",
        "email": "janaki@thepenindia.com",
        "gender": "Female",
        "phone": "9500006187"
    },
    {
        "employeeId": "PEN018",
        "name": "Malathy",
        "email": "malathy@thepenindia.com",
        "gender": "Female",
        "phone": "9080469055"
    },
    {
        "employeeId": "PEN784",
        "name": "Kishore V",
        "email": "kishore@thepenindia.com",
        "gender": "Male",
        "phone": "9360571449"
    },
    {
        "employeeId": "PEN738",
        "name": "Anton Stevenraj Arulanandaraj",
        "email": "antonstevenraj@team.thepenindia.com",
        "gender": "Male",
        "phone": "9629977916"
    },
    {
        "employeeId": "PEN721",
        "name": "Karthika Hariharan",
        "email": "karthika.h@thepenindia.com",
        "gender": "Female",
        "phone": "9159579710"
    },
    {
        "employeeId": "PEN702",
        "name": "D Karthika",
        "email": "karthika@thepenindia.com",
        "gender": "Female",
        "phone": "7904699217"
    },
    {
        "employeeId": "PEN701",
        "name": "Praveen Raj B",
        "email": "praveenraj.b@team.thepenindia.com",
        "gender": "Male",
        "phone": "9941183263"
    },
    {
        "employeeId": "PEN689",
        "name": "J Vimitha",
        "email": "vimitha.j@thepenindia.com",
        "gender": "Female",
        "phone": "9789895769"
    },
    {
        "employeeId": "PEN637",
        "name": "Cindia G",
        "email": "cindia.g@thepenindia.com",
        "gender": "Female",
        "phone": "9841513720"
    },
    {
        "employeeId": "PEN633",
        "name": "L Devika Rani",
        "email": "devikarani@thepenindia.com",
        "gender": "Female",
        "phone": "7358033955"
    },
    {
        "employeeId": "PEN631",
        "name": "Gopikrishna",
        "email": "gopikrishna@thepenindia.com",
        "gender": "Male",
        "phone": "9787572207"
    },
    {
        "employeeId": "PEN630",
        "name": "A T Elakkiyan",
        "email": "elakkiyan@thepenindia.com",
        "gender": "Male",
        "phone": "9677139687"
    },
    {
        "employeeId": "PEN613",
        "name": "Sujitha Madhanagopalan",
        "email": "sujitha@team.thepenindia.com",
        "gender": "Female",
        "phone": "8220256438"
    },
    {
        "employeeId": "PEN609",
        "name": "Antony Infant Raj P",
        "email": "antonyinfantraj@team.thepenindia.com",
        "gender": "Male",
        "phone": "9944370949"
    },
    {
        "employeeId": "PEN594",
        "name": "Amritha Varshini Sadhana",
        "email": "amrithavarshini@team.thepenindia.com",
        "gender": "Female",
        "phone": "9094424454"
    },
    {
        "employeeId": "PEN564",
        "name": "Rahul Gnanavelan",
        "email": "rahul.g@team.thepenindia.com",
        "gender": "Male",
        "phone": "8754582832"
    },
    {
        "employeeId": "PEN499",
        "name": "G Dinesh Kanth",
        "email": "dineshkanth@thepenindia.com",
        "gender": "Male",
        "phone": "9543488345"
    },
    {
        "employeeId": "PEN481",
        "name": "Nirmal Prasad",
        "email": "nirmalprasad@thepenindia.com",
        "gender": "Male",
        "phone": "8667202318"
    },
    {
        "employeeId": "PEN474",
        "name": "Mohamed Aris Shekdavdeen",
        "email": "mohamedaris@thepenindia.com",
        "gender": "Male",
        "phone": "9095077020"
    },
    {
        "employeeId": "PEN465",
        "name": "Arunima Shaji",
        "email": "arunima@thepenindia.com",
        "gender": "Female",
        "phone": "8137074781"
    },
    {
        "employeeId": "PEN440",
        "name": "Dillibaabu Moorthy",
        "email": "dillibaabu@thepenindia.com",
        "gender": "Male",
        "phone": "9600413136"
    },
    {
        "employeeId": "PEN439",
        "name": "Samyukth S",
        "email": "samyukth@thepenindia.com",
        "gender": "Male",
        "phone": "7550164895"
    },
    {
        "employeeId": "PEN200",
        "name": "Balaji Balan",
        "email": "balajibalan@thepenindia.com",
        "gender": "Male",
        "phone": "6381252123"
    },
    {
        "employeeId": "PEN067",
        "name": "Karuppaiyan Regan",
        "email": "regan@thepenindia.com",
        "gender": "Male",
        "phone": "9159791710"
    },
    {
        "employeeId": "PEN678",
        "name": "Jermanus M",
        "email": "jermanus@team.thepenindia.com",
        "gender": "Male",
        "phone": "7904453321"
    },
    {
        "employeeId": "PEN575",
        "name": "Venkatesh Muthuraman",
        "email": "venkatesh.m@team.thepenindia.com",
        "gender": "Male",
        "phone": "9566528415"
    },
    {
        "employeeId": "PEN530",
        "name": "Kannappan C",
        "email": "kannappan@thepenindia.com",
        "gender": "Male",
        "phone": "7092999622"
    },
    {
        "employeeId": "PEN130",
        "name": "Ranjeeth L",
        "email": "ranjeeth@thepenindia.com",
        "gender": "Male",
        "phone": "9894790790"
    },
    {
        "employeeId": "PEN744",
        "name": "Bupathi",
        "email": "bupati@thepenindia.com",
        "gender": "Male",
        "phone": "8939369348"
    },
    {
        "employeeId": "PEN746",
        "name": "Sajin Selvamani",
        "email": "sajin@team.thepenindia.com",
        "gender": "Male",
        "phone": "9715858269"
    },
    {
        "employeeId": "PEN745",
        "name": "Senthil Kumar K",
        "email": "senthilkumar@team.thepenindia.com",
        "gender": "Male",
        "phone": "9790900496"
    },
    {
        "employeeId": "PEN723",
        "name": "Chockalingam Venkatachalam",
        "email": "chockalingam@team.thepenindia.com",
        "gender": "Male",
        "phone": "9487555770"
    },
    {
        "employeeId": "PEN718",
        "name": "Nilavamudhan Asaithambi",
        "email": "nilavamudhan@thepenindia.com",
        "gender": "Male",
        "phone": "8270432837"
    },
    {
        "employeeId": "PEN707",
        "name": "Gowtham Sundharavadivelu",
        "email": "gowtham.s@thepenindia.com",
        "gender": "Male",
        "phone": "7502222146"
    },
    {
        "employeeId": "PEN585",
        "name": "Reshma V",
        "email": "reshma.v@team.thepenindia.com",
        "gender": "Female",
        "phone": "7010345426"
    },
    {
        "employeeId": "PEN584",
        "name": "Niranjan M",
        "email": "niranjan.m@team.thepenindia.com",
        "gender": "Male",
        "phone": "8428312000"
    },
    {
        "employeeId": "PEN541",
        "name": "Lokesh R",
        "email": "lokesh.r@team.thepenindia.com",
        "gender": "Male",
        "phone": "9176730661"
    },
    {
        "employeeId": "PEN542",
        "name": "MuthuKumar Gurusamy",
        "email": "muthukumar@thepenindia.com",
        "gender": "Male",
        "phone": "8144226040"
    },
    {
        "employeeId": "PEN529",
        "name": "Pichaimuthu M",
        "email": "pichaimuthu@thepenindia.com",
        "gender": "Male",
        "phone": "8428519434"
    },
    {
        "employeeId": "PEN526",
        "name": "Janani R M",
        "email": "janani.r@thepenindia.com",
        "gender": "Female",
        "phone": "7358287167"
    },
    {
        "employeeId": "PEN524",
        "name": "Sundar T",
        "email": "sundar@thepenindia.com",
        "gender": "Male",
        "phone": "9626059102"
    },
    {
        "employeeId": "PEN405",
        "name": "Hari D",
        "email": "hari@thepenindia.com",
        "gender": "Male",
        "phone": "9500051615"
    },
    {
        "employeeId": "PEN403",
        "name": "Hariharan B",
        "email": "hariharan.b@team.thepenindia.com",
        "gender": "Male",
        "phone": "9176412739"
    },
    {
        "employeeId": "PEN381",
        "name": "Sathiyaraj N",
        "email": "sathiyaraj@thepenindia.com",
        "gender": "Male",
        "phone": "8754301010"
    },
    {
        "employeeId": "PEN380",
        "name": "Gomathy Sankaravel Ramakrishnan",
        "email": "gomathysankaravel@thepenindia.com",
        "gender": "Male",
        "phone": "9940148058"
    },
    {
        "employeeId": "PEN378",
        "name": "Janani G",
        "email": "janani.g@thepenindia.com",
        "gender": "Female",
        "phone": "8015732439"
    },
    {
        "employeeId": "PEN370",
        "name": "Subbiah C",
        "email": "subbiah@thepenindia.com",
        "gender": "Male",
        "phone": "9047415254"
    },
    {
        "employeeId": "PEN329",
        "name": "Nigavithran K",
        "email": "nigavithran@thepenindia.com",
        "gender": "Male",
        "phone": "9566222838"
    },
    {
        "employeeId": "PEN328",
        "name": "Prem Kumar R",
        "email": "premkumar.r@thepenindia.com",
        "gender": "Male",
        "phone": "9884893663"
    },
    {
        "employeeId": "PEN300",
        "name": "Lenin Pitchai",
        "email": "lenin@team.thepenindia.com",
        "gender": "Male",
        "phone": "6382126209"
    },
    {
        "employeeId": "PEN261",
        "name": "Vignesh A",
        "email": "vignesh.a@thepenindia.com",
        "gender": "Male",
        "phone": "8807974322"
    },
    {
        "employeeId": "PEN127",
        "name": "Sakthidharan Sampathkumar",
        "email": "sakhidharan@thepenindia.com",
        "gender": "Male",
        "phone": "7200176212"
    },
    {
        "employeeId": "PEN103",
        "name": "Gokul C",
        "email": "gokul@thepenindia.com",
        "gender": "Male",
        "phone": "9789058005"
    },
    {
        "employeeId": "PEN097",
        "name": "Kirubakaran",
        "email": "kirubakaran.r@thepenindia.com",
        "gender": "Male",
        "phone": "7904642051"
    },
    {
        "employeeId": "PEN079",
        "name": "Ranganath",
        "email": "ranganathan@thepenindia.com",
        "gender": "Male",
        "phone": "8608110071"
    },
    {
        "employeeId": "PEN072",
        "name": "Niteshkumaar",
        "email": "niteshkumaar@thepenindia.com",
        "gender": "Male",
        "phone": "9080280986"
    },
    {
        "employeeId": "PEN071",
        "name": "Dhakshina Moorthy",
        "email": "dhakshinamoorthy@thepenindia.com",
        "gender": "Male",
        "phone": "8939366351"
    },
    {
        "employeeId": "PEN060",
        "name": "Sachithanantham P",
        "email": "sachithanantham@thepenindia.com",
        "gender": "Male",
        "phone": "8220366018"
    },
    {
        "employeeId": "PEN058",
        "name": "Ponmozhi J M",
        "email": "ponmozhi@thepenindia.com",
        "gender": "Male",
        "phone": "9789945288"
    },
    {
        "employeeId": "PEN023",
        "name": "Silvia J",
        "email": "silvia@thepenindia.com",
        "gender": "Female",
        "phone": "7092225525"
    },
    {
        "employeeId": "PEN500",
        "name": "Kamala Kannan Nagarajan",
        "email": "kamalakannan@thepenindia.com",
        "gender": "Male",
        "phone": "8220255498"
    },
    {
        "employeeId": "PEN379",
        "name": "Rishi Ramesh",
        "email": "rishi@thepenindia.com",
        "gender": "Male",
        "phone": "8098053778"
    },
    {
        "employeeId": "PEN376",
        "name": "Vaidehi M",
        "email": "vaidehi.m@thepenindia.com",
        "gender": "Female",
        "phone": "9884373302"
    },
    {
        "employeeId": "PEN772",
        "name": "Shiney A",
        "email": "shiney@team.thepenindia.com",
        "gender": "Female",
        "phone": "9087576005"
    },
    {
        "employeeId": "PEN759",
        "name": "Pranav",
        "email": "pranav.s@team.thepenindia.com",
        "gender": "Male",
        "phone": "9361925625"
    },
    {
        "employeeId": "PEN758",
        "name": "Gokul Pandian M",
        "email": "gokulpandian@team.thepenindia.com",
        "gender": "Male",
        "phone": "7010530621"
    },
    {
        "employeeId": "PEN760",
        "name": "Sanjay B",
        "email": "sanjay.b@team.thepenindia.com",
        "gender": "Male",
        "phone": "8610517292"
    },
    {
        "employeeId": "PEN757",
        "name": "Pandi Ganesh S",
        "email": "pandiganesh@team.thepenindia.com",
        "gender": "Male",
        "phone": "7695879362"
    },
    {
        "employeeId": "PEN753",
        "name": "M S Sreeharan",
        "email": "sreeharan@team.thepenindia.com",
        "gender": "Male",
        "phone": "8825420416"
    },
    {
        "employeeId": "PEN712",
        "name": "Sundarrajan P C",
        "email": "sundarrajan@team.thepenindia.com",
        "gender": "Male",
        "phone": "7449002292"
    },
    {
        "employeeId": "PEN710",
        "name": "Vishali Sivakumar",
        "email": "vishali@team.thepenindia.com",
        "gender": "Female",
        "phone": "7373737279"
    },
    {
        "employeeId": "PEN709",
        "name": "Brindha Babu",
        "email": "brindha@team.thepenindia.com",
        "gender": "Female",
        "phone": "9962696105"
    },
    {
        "employeeId": "PEN632",
        "name": "Pragadeeswaran P",
        "email": "pragadeeswaran@thepenindia.com",
        "gender": "Male",
        "phone": "8883058151"
    },
    {
        "employeeId": "PEN625",
        "name": "B Anand",
        "email": "anand.b@team.thepenindia.com",
        "gender": "Male",
        "phone": "9940594752"
    },
    {
        "employeeId": "PEN610",
        "name": "Joseph Raj A",
        "email": "josephraj@team.thepenindia.com",
        "gender": "Male",
        "phone": "8939494634"
    },
    {
        "employeeId": "PEN576",
        "name": "Bepin Chandrapaul",
        "email": "bepin@team.thepenindia.com",
        "gender": "Male",
        "phone": "9514519161"
    },
    {
        "employeeId": "PEN569",
        "name": "Nithyasri Balamurugan",
        "email": "nithyasri@team.thepenindia.com",
        "gender": "Female",
        "phone": "7339448105"
    },
    {
        "employeeId": "PEN567",
        "name": "Bernath Anbu R",
        "email": "bernath@team.thepenindia.com",
        "gender": "Male",
        "phone": "8610100927"
    },
    {
        "employeeId": "PEN538",
        "name": "Sunil Kumar S",
        "email": "sunilkumar@thepenindia.com",
        "gender": "Male",
        "phone": "9965249243"
    },
    {
        "employeeId": "PEN523",
        "name": "S P Afreen Banu",
        "email": "afreen@thepenindia.com",
        "gender": "Female",
        "phone": "9791029258"
    },
    {
        "employeeId": "PEN522",
        "name": "Mohamed Azif Sardhari K",
        "email": "azif@thepenindia.com",
        "gender": "Male",
        "phone": "9488365072"
    },
    {
        "employeeId": "PEN516",
        "name": "Vignesh Kumar M",
        "email": "vignesh.m@thepenindia.com",
        "gender": "Male",
        "phone": "9080832749"
    },
    {
        "employeeId": "PEN502",
        "name": "Ganesh Prasath S",
        "email": "ganesh@thepenindia.com",
        "gender": "Male",
        "phone": "9345600445"
    },
    {
        "employeeId": "PEN478",
        "name": "Monisha S",
        "email": "monisha@thepenindia.com",
        "gender": "Female",
        "phone": "8778033882"
    },
    {
        "employeeId": "PEN458",
        "name": "Bilal M",
        "email": "bilal@thepenindia.com",
        "gender": "Male",
        "phone": "8939679119"
    },
    {
        "employeeId": "PEN442",
        "name": "Kirubakaran Sellavel",
        "email": "kirubakaran.s@thepenindia.com",
        "gender": "Male",
        "phone": "8248380878"
    },
    {
        "employeeId": "PEN429",
        "name": "P Kotteswaran",
        "email": "kotteswaran@thepenindia.com",
        "gender": "Male",
        "phone": "7358732789"
    },
    {
        "employeeId": "PEN428",
        "name": "Gunasekar J",
        "email": "gunasekar@thepenindia.com",
        "gender": "Male",
        "phone": "9043236495"
    },
    {
        "employeeId": "PEN388",
        "name": "Sathish Kumar",
        "email": "sathishkumar.m@thepenindia.com",
        "gender": "Male",
        "phone": "7358784755"
    },
    {
        "employeeId": "PEN387",
        "name": "Ramesh K",
        "email": "ramesh.k@thepenindia.com",
        "gender": "Male",
        "phone": "9952030306"
    },
    {
        "employeeId": "PEN367",
        "name": "Sneha Muruganantham",
        "email": "sneha@thepenindia.com",
        "gender": "Female",
        "phone": "9626423701"
    },
    {
        "employeeId": "PEN304",
        "name": "Ranjithkumar R",
        "email": "ranjithkumar@thepenindia.com",
        "gender": "Male",
        "phone": "9159482507"
    },
    {
        "employeeId": "PEN213",
        "name": "Lakshmanakumar Mani",
        "email": "lakshmanakumar@thepenindia.com",
        "gender": "Male",
        "phone": "9047286179"
    },
    {
        "employeeId": "PEN162",
        "name": "Arun Ram P",
        "email": "arunram@thepenindia.com",
        "gender": "Male",
        "phone": "9150722385"
    },
    {
        "employeeId": "PEN158",
        "name": "Tajjul Arfin",
        "email": "tajjul@thepenindia.com",
        "gender": "Male",
        "phone": "7825997361"
    },
    {
        "employeeId": "PEN070",
        "name": "Kishok Kumar",
        "email": "kishok@thepenindia.com",
        "gender": "Male",
        "phone": "9655583351"
    },
    {
        "employeeId": "PEN061",
        "name": "Sahayaraj",
        "email": "sahayaraj@thepenindia.com",
        "gender": "Male",
        "phone": "8189841793"
    },
    {
        "employeeId": "PEN119",
        "name": "Praba J",
        "email": "jayapraba@thepenindia.com",
        "gender": "Female",
        "phone": "8778753587"
    },
    {
        "employeeId": "PEN752",
        "name": "Vindhiya B",
        "email": "vindhiya@thepenindia.com",
        "gender": "Female",
        "phone": "9080157359"
    },
    {
        "employeeId": "PEN750",
        "name": "Allwin Franko S",
        "email": "allwinfranko@thepenindia.com",
        "gender": "Male",
        "phone": "7904520028"
    },
    {
        "employeeId": "PEN695",
        "name": "C Roselin Jeya Mary",
        "email": "roselin.c@thepenindia.com",
        "gender": "Female",
        "phone": "9677005465"
    },
    {
        "employeeId": "PEN688",
        "name": "Harish P",
        "email": "harish.p@thepenindia.com",
        "gender": "Male",
        "phone": "6382454423"
    },
    {
        "employeeId": "PEN168",
        "name": "Somasundara Sadasivam Dhinakaran",
        "email": "sadasivam@thepenindia.com",
        "gender": "Male",
        "phone": "9677030978"
    },
    {
        "employeeId": "PEN540",
        "name": "Saravanan Alagappan",
        "email": "saravanan@thepenindia.com",
        "gender": "Male",
        "phone": "9841791777"
    },
    {
        "employeeId": "PEN427",
        "name": "Sindhu M",
        "email": "sindhu@thepenindia.com",
        "gender": "Female",
        "phone": "9003068237"
    },
    {
        "employeeId": "PEN313",
        "name": "Abinaya D",
        "email": "abinaya@thepenindia.com",
        "gender": "Female",
        "phone": "9840127008"
    },
    {
        "employeeId": "PEN160",
        "name": "Karthikeyan J",
        "email": "karthikeyan.j@thepenindia.com",
        "gender": "Male",
        "phone": "7845628173"
    },
    {
        "employeeId": "PEN147",
        "name": "Prasanna Venkadesh R",
        "email": "prasanna@thepenindia.com",
        "gender": "Male",
        "phone": "9514198365"
    },
    {
        "employeeId": "PEN761",
        "name": "Ligin A",
        "email": "ligin@team.thepenindia.com",
        "gender": "Male",
        "phone": "9025739098"
    },
    {
        "employeeId": "PEN762",
        "name": "K Tharun",
        "email": "tharun.k@team.thepenindia.com",
        "gender": "Male",
        "phone": "9952448542"
    },
    {
        "employeeId": "PEN737",
        "name": "Anbarasu Ganesan",
        "email": "anbarasu@team.thepenindia.com",
        "gender": "Male",
        "phone": "9578423767"
    },
    {
        "employeeId": "PEN732",
        "name": "Dhanalakshmi S S",
        "email": "dhanalakshmi@team.thepenindia.com",
        "gender": "Female",
        "phone": "8754464186"
    },
    {
        "employeeId": "PEN720",
        "name": "Prithi Murugan",
        "email": "prithi@thepenindia.com",
        "gender": "Female",
        "phone": "6379619214"
    },
    {
        "employeeId": "PEN717",
        "name": "Gomathi K",
        "email": "gomathi.k@thepenindia.com",
        "gender": "Female",
        "phone": "9176672733"
    },
    {
        "employeeId": "PEN699",
        "name": "Hariharan K",
        "email": "hariharan.k@team.thepenindia.com",
        "gender": "Male",
        "phone": "8072400368"
    },
    {
        "employeeId": "PEN670",
        "name": "Gokul V",
        "email": "gokul.v@team.thepenindia.com",
        "gender": "Male",
        "phone": "9940360686"
    },
    {
        "employeeId": "PEN669",
        "name": "Jerishchristober M",
        "email": "jerishchristober@team.thepenindia.com",
        "gender": "Male",
        "phone": "9345353716"
    },
    {
        "employeeId": "PEN667",
        "name": "Raveendar V",
        "email": "raveendar.v@team.thepenindia.com",
        "gender": "Male",
        "phone": "6380937267"
    },
    {
        "employeeId": "PEN666",
        "name": "Bharath",
        "email": "bharath.p@team.thepenindia.com",
        "gender": "Male",
        "phone": "8838360499"
    },
    {
        "employeeId": "PEN568",
        "name": "Deva Ignatius Cyril L",
        "email": "deva@team.thepenindia.com",
        "gender": "Male",
        "phone": "9894476560"
    },
    {
        "employeeId": "PEN553",
        "name": "Madhumitha Ravichandran",
        "email": "madhumithaa@team.thepenindia.com",
        "gender": "Female",
        "phone": "9150544119"
    },
    {
        "employeeId": "PEN519",
        "name": "Anitha Mookkan",
        "email": "anitha@thepenindia.com",
        "gender": "Female",
        "phone": "6369009872"
    },
    {
        "employeeId": "PEN369",
        "name": "Cibi Ramadoss",
        "email": "cibi@thepenindia.com",
        "gender": "Male",
        "phone": "8667496567"
    },
    {
        "employeeId": "PEN291",
        "name": "M Jeeva",
        "email": "jeeva@thepenindia.com",
        "gender": "Male",
        "phone": "9940013226"
    },
    {
        "employeeId": "PEN170",
        "name": "Kaviyarasan R",
        "email": "kaviyarasan@thepenindia.com",
        "gender": "Male",
        "phone": "9965260409"
    },
    {
        "employeeId": "PEN148",
        "name": "Wilfredraymond J",
        "email": "wilfredraymond@thepenindia.com",
        "gender": "Male",
        "phone": "8072399901"
    },
    {
        "employeeId": "PEN131",
        "name": "Vivegananthan",
        "email": "vivegananthan@thepenindia.com",
        "gender": "Male",
        "phone": "9840970275"
    },
    {
        "employeeId": "PEN099",
        "name": "Azharudeen",
        "email": "azarudeen@thepenindia.com",
        "gender": "Male",
        "phone": "9940413832"
    },
    {
        "employeeId": "PEN024",
        "name": "Tamilmaran Moorthy",
        "email": "tamilmaran@thepenindia.com",
        "gender": "Male",
        "phone": "9884383097"
    },
    {
        "employeeId": "PEN577",
        "name": "M Vidhya",
        "email": "vidhya.m@team.thepenindia.com",
        "gender": "Female",
        "phone": "9150392153"
    },
    {
        "employeeId": "PEN552",
        "name": "Tamilselvi Vaithianadhan",
        "email": "tamilselvi.v@team.thepenindia.com",
        "gender": "Female",
        "phone": "6379315067"
    },
    {
        "employeeId": "PEN767",
        "name": "Jayanthra Pandian T",
        "email": "jayanthra@team.thepenindia.com",
        "gender": "Male",
        "phone": "7604833908"
    },
    {
        "employeeId": "PEN764",
        "name": "Jessica Vijayanand",
        "email": "jessica.v@team.thepenindia.com",
        "gender": "Female",
        "phone": "9962586118"
    },
    {
        "employeeId": "PEN766",
        "name": "Roshini P",
        "email": "roshini.p@team.thepenindia.com",
        "gender": "Female",
        "phone": "9080006195"
    },
    {
        "employeeId": "PEN765",
        "name": "Meenakshi",
        "email": "meenakshi.k@team.thepenindia.com",
        "gender": "Female",
        "phone": "7904490543"
    },
    {
        "employeeId": "PEN763",
        "name": "Dilli Ganesan P",
        "email": "dilliganesan@team.thepenindia.com",
        "gender": "Male",
        "phone": "7604908144"
    },
    {
        "employeeId": "PEN722",
        "name": "Minish M",
        "email": "minish@thepenindia.com",
        "gender": "Male",
        "phone": "9688555483"
    },
    {
        "employeeId": "PEN592",
        "name": "Karthick M",
        "email": "karthick.m@team.thepenindia.com",
        "gender": "Male",
        "phone": "9585178671"
    },
    {
        "employeeId": "PEN591",
        "name": "Sanjeev B",
        "email": "sanjeev@team.thepenindia.com",
        "gender": "Male",
        "phone": "9080357961"
    },
    {
        "employeeId": "PEN520",
        "name": "Shajan Varadharajan",
        "email": "shajan@thepenindia.com",
        "gender": "Male",
        "phone": "6382001463"
    },
    {
        "employeeId": "PEN518",
        "name": "Deepak V",
        "email": "deepakvasudevan@thepenindia.com",
        "gender": "Male",
        "phone": "9080252380"
    },
    {
        "employeeId": "PEN498",
        "name": "Praveen Kumar",
        "email": "praveenkumar@thepenindia.com",
        "gender": "Male",
        "phone": "9789706958"
    },
    {
        "employeeId": "PEN497",
        "name": "Santhoshkumar Vellingiri",
        "email": "santhosh.v@thepenindia.com",
        "gender": "Male",
        "phone": "9677947083"
    },
    {
        "employeeId": "PEN494",
        "name": "Balaji K",
        "email": "balaji.k@thepenindia.com",
        "gender": "Male",
        "phone": "6369405108"
    },
    {
        "employeeId": "PEN487",
        "name": "Ashokkumar K",
        "email": "ashok@thepenindia.com",
        "gender": "Male",
        "phone": "9626495365"
    },
    {
        "employeeId": "PEN441",
        "name": "Sivaraj S",
        "email": "sivaraj@thepenindia.com",
        "gender": "Male",
        "phone": "8610334796"
    },
    {
        "employeeId": "PEN406",
        "name": "Keerthika S",
        "email": "keerthika@thepenindia.com",
        "gender": "Female",
        "phone": "9566091201"
    },
    {
        "employeeId": "PEN398",
        "name": "P Alex Jachin Samraj",
        "email": "alex@thepenindia.com",
        "gender": "Male",
        "phone": "7708699641"
    },
    {
        "employeeId": "PEN397",
        "name": "Janani",
        "email": "jananigopal@thepenindia.com",
        "gender": "Female",
        "phone": "8870415911"
    },
    {
        "employeeId": "PEN392",
        "name": "Muthu Kannan",
        "email": "muthu@thepenindia.com",
        "gender": "Male",
        "phone": "8015888587"
    },
    {
        "employeeId": "PEN390",
        "name": "Santhoshkumar Arjunan",
        "email": "santhoshkumar@thepenindia.com",
        "gender": "Male",
        "phone": "8754921598"
    },
    {
        "employeeId": "PEN386",
        "name": "Ranjith K",
        "email": "ranjith.k@thepenindia.com",
        "gender": "Male",
        "phone": "9585846104"
    },
    {
        "employeeId": "PEN330",
        "name": "Lakshmanan",
        "email": "lakshmanan.s@thepenindia.com",
        "gender": "Male",
        "phone": "8754432938"
    },
    {
        "employeeId": "PEN302",
        "name": "Arumugam Saminathan",
        "email": "arumugam@thepenindia.com",
        "gender": "Male",
        "phone": "9566235746"
    },
    {
        "employeeId": "PEN298",
        "name": "Vijay Hariharan B K",
        "email": "vijayhariharan@thepenindia.com",
        "gender": "Male",
        "phone": "9500094971"
    },
    {
        "employeeId": "PEN297",
        "name": "Manoj Venkatachalam",
        "email": "manojvenkatachalam@thepenindia.com",
        "gender": "Male",
        "phone": "7373684049"
    },
    {
        "employeeId": "PEN293",
        "name": "Anandh K",
        "email": "anandh@thepenindia.com",
        "gender": "Male",
        "phone": "8270068402"
    },
    {
        "employeeId": "PEN218",
        "name": "Madhusoodhanan K",
        "email": "madhusoodhanan@thepenindia.com",
        "gender": "Male",
        "phone": "8438296223"
    },
    {
        "employeeId": "PEN216",
        "name": "T Paramasakthi",
        "email": "paramasakthi@thepenindia.com",
        "gender": "Female",
        "phone": "8668034173"
    },
    {
        "employeeId": "PEN215",
        "name": "Ilangathir",
        "email": "ilangathir@thepenindia.com",
        "gender": "Male",
        "phone": "6379589622"
    },
    {
        "employeeId": "PEN209",
        "name": "Muthamilmannan Mathiyazhagan",
        "email": "muthamilmannan@thepenindia.com",
        "gender": "Male",
        "phone": "9688428899"
    },
    {
        "employeeId": "PEN201",
        "name": "K Dharmadurai",
        "email": "dharmadurai@thepenindia.com",
        "gender": "Male",
        "phone": "9710941375"
    },
    {
        "employeeId": "PEN177",
        "name": "Muthamizhselvi",
        "email": "muthamizhselvi@thepenindia.com",
        "gender": "Female",
        "phone": "9360061505"
    },
    {
        "employeeId": "PEN167",
        "name": "Satham Hussain A",
        "email": "satham@thepenindia.com",
        "gender": "Male",
        "phone": "6381248371"
    },
    {
        "employeeId": "PEN161",
        "name": "Priyadharshini K",
        "email": "priyadharshini.k@thepenindia.com",
        "gender": "Female",
        "phone": "8870241889"
    },
    {
        "employeeId": "PEN157",
        "name": "Alagu Chella Ganapathy S",
        "email": "alagu@thepenindia.com",
        "gender": "Male",
        "phone": "9940903546"
    },
    {
        "employeeId": "PEN154",
        "name": "Karthik R",
        "email": "karthik.r@thepenindia.com",
        "gender": "Male",
        "phone": "7639126280"
    },
    {
        "employeeId": "PEN153",
        "name": "Mohamed Nayeem S",
        "email": "mohamednayeem@thepenindia.com",
        "gender": "Male",
        "phone": "9042353501"
    },
    {
        "employeeId": "PEN146",
        "name": "Vidhya S",
        "email": "vidhya.s@thepenindia.com",
        "gender": "Female",
        "phone": "9787354328"
    },
    {
        "employeeId": "PEN143",
        "name": "Priyanga S",
        "email": "priyanga@thepenindia.com",
        "gender": "Female",
        "phone": "8526737741"
    },
    {
        "employeeId": "PEN139",
        "name": "Jeyanth Janakiram M",
        "email": "jeyanth@thepenindia.com",
        "gender": "Male",
        "phone": "9092542040"
    },
    {
        "employeeId": "PEN136",
        "name": "Aravinth C",
        "email": "aravinth@thepenindia.com",
        "gender": "Male",
        "phone": "7639608024"
    },
    {
        "employeeId": "PEN135",
        "name": "Gomathi D",
        "email": "gomathi@thepenindia.com",
        "gender": "Female",
        "phone": "9943538055"
    },
    {
        "employeeId": "PEN115",
        "name": "Sivakumar",
        "email": "sivakumar@thepenindia.com",
        "gender": "Male",
        "phone": "9941450699"
    },
    {
        "employeeId": "PEN078",
        "name": "Ajith Mahendiran",
        "email": "ajith@thepenindia.com",
        "gender": "Male",
        "phone": "9524013338"
    },
    {
        "employeeId": "PEN077",
        "name": "Sri Balaji Viswanath P",
        "email": "balajiviswanath@thepenindia.com",
        "gender": "Male",
        "phone": "9994166643"
    },
    {
        "employeeId": "PEN066",
        "name": "Chennaiyan",
        "email": "chennaiyan@thepenindia.com",
        "gender": "Male",
        "phone": "7598992817"
    },
    {
        "employeeId": "PEN059",
        "name": "Arunkumar J",
        "email": "arunkumar@thepenindia.com",
        "gender": "Male",
        "phone": "9500442983"
    },
    {
        "employeeId": "PEN054",
        "name": "Vivek L",
        "email": "vivek@thepenindia.com",
        "gender": "Male",
        "phone": "7708991797"
    },
    {
        "employeeId": "PEN053",
        "name": "Rama Subramaniam Muthukrishnan",
        "email": "ramasubramaniam@thepenindia.com",
        "gender": "Male",
        "phone": "9810617326"
    },
    {
        "employeeId": "PEN052",
        "name": "Mukhil Vannan K",
        "email": "mukhilvannan@thepenindia.com",
        "gender": "Male",
        "phone": "6379641830"
    },
    {
        "employeeId": "PEN035",
        "name": "Bakyalakshmi G",
        "email": "bakya@thepenindia.com",
        "gender": "Female",
        "phone": "7639155037"
    },
    {
        "employeeId": "PEN029",
        "name": "Yogesh S",
        "email": "yogesh@thepenindia.com",
        "gender": "Male",
        "phone": "9840025246"
    },
    {
        "employeeId": "PEN028",
        "name": "Vishnu",
        "email": "vishnu@thepenindia.com",
        "gender": "Male",
        "phone": "9789480344"
    },
    {
        "employeeId": "PEN026",
        "name": "Monesh",
        "email": "monesh@thepenindia.com",
        "gender": "Male",
        "phone": "6379845044"
    },
    {
        "employeeId": "PEN017",
        "name": "Vivek Radhakrishnan",
        "email": "vivek.r@thepenindia.com",
        "gender": "Male",
        "phone": "8508719378"
    },
    {
        "employeeId": "PEN007",
        "name": "Manikandan",
        "email": "manikandan.a@thepenindia.com",
        "gender": "Male",
        "phone": "8220343936"
    },
    {
        "employeeId": "PEN554",
        "name": "Ramya Rajendran",
        "email": "ramya@team.thepenindia.com",
        "gender": "Female",
        "phone": "7548836660"
    },
    {
        "employeeId": "PEN247",
        "name": "J Srinivasan",
        "email": "srinivasan@thepenindia.com",
        "gender": "Male",
        "phone": "9176688574"
    },
    {
        "employeeId": "PEN703",
        "name": "Varsha",
        "email": "varsha.b@team.thepenindia.com",
        "gender": "Female",
        "phone": "7338910904"
    },
    {
        "employeeId": "PEN690",
        "name": "Jaraslo Vinod Raj W J",
        "email": "jaraslovinodraj@thepenindia.com",
        "gender": "Male",
        "phone": "9884856506"
    },
    {
        "employeeId": "PEN536",
        "name": "Sathish Kumar V",
        "email": "sathishkumar@thepenindia.com",
        "gender": "Male",
        "phone": "9962695767"
    },
    {
        "employeeId": "PEN144",
        "name": "Sowndharya S",
        "email": "sowndharya@team.thepenindia.com",
        "gender": "Female",
        "phone": "8838791517"
    },
    {
        "employeeId": "PEN773",
        "name": "Jeshwanth Kumar A S",
        "email": "jeshwanth@thepenindia.com",
        "gender": "Male",
        "phone": "8838872174"
    },
    {
        "employeeId": "PEN771",
        "name": "Aksa Ann George",
        "email": "aksaann@team.thepenindia.com",
        "gender": "Female",
        "phone": "8589959781"
    },
    {
        "employeeId": "PEN770",
        "name": "Jayabashini Ra",
        "email": "jayabashini@team.thepenindia.com",
        "gender": "Female",
        "phone": "6383441477"
    },
    {
        "employeeId": "PEN769",
        "name": "Reena Mugesh",
        "email": "reenamugesh@team.thepenindia.com",
        "gender": "Female",
        "phone": "8220630689"
    },
    {
        "employeeId": "PEN768",
        "name": "O Lakshmi Prathyusha",
        "email": "lakshmi.p@team.thepenindia.com",
        "gender": "Female",
        "phone": "7810095676"
    },
    {
        "employeeId": "PEN748",
        "name": "Vijay kumar S",
        "email": "vijaykumar.s@thepenindia.com",
        "gender": "Male",
        "phone": "7042631654"
    },
    {
        "employeeId": "PEN706",
        "name": "Lokesh",
        "email": "lokesh@thepenindia.com",
        "gender": "Male",
        "phone": "9944056231"
    },
    {
        "employeeId": "PEN705",
        "name": "M Chilambarasan",
        "email": "chilambarasan@thepenindia.com",
        "gender": "Male",
        "phone": "9600018066"
    },
    {
        "employeeId": "PEN665",
        "name": "Tamilvarma E",
        "email": "tamilvarma@team.thepenindia.com",
        "gender": "Male",
        "phone": "9176130633"
    },
    {
        "employeeId": "PEN663",
        "name": "Madhumethaa J",
        "email": "madhumethaa@team.thepenindia.com",
        "gender": "Female",
        "phone": "9789180186"
    },
    {
        "employeeId": "PEN661",
        "name": "Shekin S",
        "email": "shekin@team.thepenindia.com",
        "gender": "Male",
        "phone": "9360443483"
    },
    {
        "employeeId": "PEN614",
        "name": "Lakshman J",
        "email": "lakshman.j@team.thepenindia.com",
        "gender": "Male",
        "phone": "9789037972"
    },
    {
        "employeeId": "PEN608",
        "name": "Santhanabharathi Sadhasivam",
        "email": "santhanabharathi@team.thepenindia.com",
        "gender": "Male",
        "phone": "8754376535"
    },
    {
        "employeeId": "PEN531",
        "name": "M Janakavi",
        "email": "janakavi@thepenindia.com",
        "gender": "Female",
        "phone": "6382449253"
    },
    {
        "employeeId": "PEN480",
        "name": "S Tamilselvan",
        "email": "tamilselvan@thepenindia.com",
        "gender": "Male",
        "phone": "9944200831"
    },
    {
        "employeeId": "PEN459",
        "name": "Raghavi Savarimuthu",
        "email": "raghavi@thepenindia.com",
        "gender": "Female",
        "phone": "9884457785"
    },
    {
        "employeeId": "PEN443",
        "name": "Saravanakumar R",
        "email": "saravanakumar.r@thepenindia.com",
        "gender": "Male",
        "phone": "8939783500"
    },
    {
        "employeeId": "PEN316",
        "name": "Jemiemol Ann Raju",
        "email": "jemiemol@thepenindia.com",
        "gender": "Female",
        "phone": "9791164331"
    },
    {
        "employeeId": "PEN287",
        "name": "Sharen Jayakumar",
        "email": "sharen@thepenindia.com",
        "gender": "Female",
        "phone": "9600170529"
    },
    {
        "employeeId": "PEN194",
        "name": "R Roopkala",
        "email": "roopkala@thepenindia.com",
        "gender": "Female",
        "phone": "9840539876"
    },
    {
        "employeeId": "PEN171",
        "name": "Karthik S",
        "email": "karthik.s@thepenindia.com",
        "gender": "Male",
        "phone": "9944846635"
    },
    {
        "employeeId": "PEN165",
        "name": "Sophia Traphena Rachael R",
        "email": "sophia@thepenindia.com",
        "gender": "Female",
        "phone": "8807198481"
    },
    {
        "employeeId": "PEN057",
        "name": "Gokul Nath V",
        "email": "gokulnathv@thepenindia.com",
        "gender": "Male",
        "phone": "8754803001"
    },
    {
        "employeeId": "PEN049",
        "name": "T Vigneshwaran",
        "email": "vigneshwarant@thepenindia.com",
        "gender": "Male",
        "phone": "6383537211"
    },
    {
        "employeeId": "PEN776",
        "name": "Gowtham S",
        "email": "gowthamsanjeevi@thepenindia.com",
        "gender": "Male",
        "phone": "8883477849"
    },
    {
        "employeeId": "PEN774",
        "name": "Karthick S",
        "email": "karthick.s@thepenindia.com",
        "gender": "Male",
        "phone": "9080386105"
    },
    {
        "employeeId": "PEN778",
        "name": "Yogalakshmi",
        "email": "yogalakshmi@thepenindia.com",
        "gender": "Female",
        "phone": "9551155768"
    },
    {
        "employeeId": "PEN779",
        "name": "Jaishree",
        "email": "jaishree@thepenindia.com",
        "gender": "Female",
        "phone": "9940550598"
    },
    {
        "employeeId": "PEN775",
        "name": "Vasanth Dev",
        "email": "vasanthdev@thepenindia.com",
        "gender": "Male",
        "phone": "8148268160"
    },
    {
        "employeeId": "PEN783",
        "name": "Anbumani Muthusamy",
        "email": "anbumani@team.thepenindia.com",
        "gender": "Male",
        "phone": "9080151118"
    },
    {
        "employeeId": "PEN780",
        "name": "Yogeswaran Nagarajan",
        "email": "yogeswaran@team.thepenindia.com",
        "gender": "Male",
        "phone": "8056997266"
    },
    {
        "employeeId": "PEN782",
        "name": "Saravanakumar Veeravel",
        "email": "saravanakumar@team.thepenindia.com",
        "gender": "Male",
        "phone": "7339339697"
    },
    {
        "employeeId": "PEN735",
        "name": "Narayanamoorthy S",
        "email": "narayanamoorthy@thepenindia.com",
        "gender": "Male",
        "phone": "9344580688"
    },
    {
        "employeeId": "PEN724",
        "name": "Ganesh S",
        "email": "ganesh.s@thepenindia.com",
        "gender": "Male",
        "phone": "8072009561"
    },
    {
        "employeeId": "PEN714",
        "name": "Dhivagar Govindharaj",
        "email": "dhivagar@thepenindia.com",
        "gender": "Male",
        "phone": "7904162746"
    },
    {
        "employeeId": "PEN713",
        "name": "Rajvel Ravichandran",
        "email": "rajvel@thepenindia.com",
        "gender": "Male",
        "phone": "9042610708"
    },
    {
        "employeeId": "PEN675",
        "name": "C Laxmidhar Srini",
        "email": "laxmidhar@thepenindia.com",
        "gender": "Male",
        "phone": "9003485156"
    },
    {
        "employeeId": "PEN355",
        "name": "Vivek Rajakumar Varamtharumperumal",
        "email": "vivekrajakumar@thepenindia.com",
        "gender": "Male",
        "phone": "9445835951"
    },
    {
        "employeeId": "PEN503",
        "name": "A Jegan",
        "email": "jegan.a@thepenindia.com",
        "gender": "Male",
        "phone": "8754780554"
    },
    {
        "employeeId": "PEN495",
        "name": "V R Karthikeyan",
        "email": "karthikeyan.vr@thepenindia.com",
        "gender": "Male",
        "phone": "7339555933"
    },
    {
        "employeeId": "PEN456",
        "name": "Mohamed Nashid Mifzal",
        "email": "nashid@thepenindia.com",
        "gender": "Male",
        "phone": "9500765068"
    },
    {
        "employeeId": "PEN454",
        "name": "Mohan P",
        "email": "mohan@thepenindia.com",
        "gender": "Male",
        "phone": "8220618298"
    },
    {
        "employeeId": "PEN453",
        "name": "D Varudhini",
        "email": "varudhini@thepenindia.com",
        "gender": "Female",
        "phone": "6383873918"
    },
    {
        "employeeId": "PEN383",
        "name": "Prakash Rangarajan",
        "email": "prakash.r@thepenindia.com",
        "gender": "Male",
        "phone": "9092529023"
    },
    {
        "employeeId": "PEN373",
        "name": "Siva Shankar Nagarajan",
        "email": "sivashankar@thepenindia.com",
        "gender": "Male",
        "phone": "9940733935"
    },
    {
        "employeeId": "PEN353",
        "name": "Manoj V T",
        "email": "manoj@thepenindia.com",
        "gender": "Male",
        "phone": "8681818177"
    },
    {
        "employeeId": "PEN352",
        "name": "Jeffrin Binu W",
        "email": "jeffrin@thepenindia.com",
        "gender": "Male",
        "phone": "9361400978"
    },
    {
        "employeeId": "PEN351",
        "name": "Rajarajeswari Lakshmi M",
        "email": "rajarajeswarilakshmi@thepenindia.com",
        "gender": "Female",
        "phone": "9962437279"
    },
    {
        "employeeId": "PEN350",
        "name": "Nalini Baddireddi",
        "email": "nalini@thepenindia.com",
        "gender": "Female",
        "phone": "9059928806"
    },
    {
        "employeeId": "PEN349",
        "name": "Hariharan S",
        "email": "hariharan@thepenindia.com",
        "gender": "Male",
        "phone": "6383540837"
    },
    {
        "employeeId": "PEN348",
        "name": "Hemnath B",
        "email": "hemnath@thepenindia.com",
        "gender": "Male",
        "phone": "9087768200"
    },
    {
        "employeeId": "PEN347",
        "name": "Aditya Ram B B",
        "email": "adityaram@thepenindia.com",
        "gender": "Male",
        "phone": "9952014623"
    },
    {
        "employeeId": "PEN326",
        "name": "Muhilvannan Thirumaran",
        "email": "muhilvannan.t@thepenindia.com",
        "gender": "Male",
        "phone": "6383206482"
    },
    {
        "employeeId": "PEN315",
        "name": "Loganathan",
        "email": "loganathan@thepenindia.com",
        "gender": "Male",
        "phone": "8489808561"
    },
    {
        "employeeId": "PEN288",
        "name": "Das Antony Jeanne",
        "email": "dasantony@thepenindia.com",
        "gender": "Male",
        "phone": "9489453903"
    },
    {
        "employeeId": "PEN173",
        "name": "Tamilselvi K",
        "email": "tamilselvi@thepenindia.com",
        "gender": "Female",
        "phone": "9092314820"
    },
    {
        "employeeId": "PEN163",
        "name": "Thenmozhi S",
        "email": "thenmozhi@thepenindia.com",
        "gender": "Female",
        "phone": "9524132898"
    },
    {
        "employeeId": "PEN155",
        "name": "Vignesh R",
        "email": "vignesh.r@thepenindia.com",
        "gender": "Male",
        "phone": "9597711181"
    },
    {
        "employeeId": "PEN068",
        "name": "Prasna Padmanabhan",
        "email": "prasna@thepenindia.com",
        "gender": "Female",
        "phone": "9566062067"
    },
    {
        "employeeId": "PEN031",
        "name": "Vishnuraj S",
        "email": "vishnuraj.s@thepenindia.com",
        "gender": "Male",
        "phone": "9786913832"
    },
    {
        "employeeId": "PEN025",
        "name": "Viswanathan M",
        "email": "viswa@thepenindia.com",
        "gender": "Male",
        "phone": "7824029466"
    },
    {
        "name": "Thulasiraman S",
        "email": "thulasiraman.s@wele.in",
        "phone": "9043104868",
        "gender": "Male",
        "employeeId": "TH001"
    }

];

// ==========================================================
// AUTO-UPLOAD LOGIC (Do not modify below this line)
// ==========================================================

const importUsers = async () => {
    try {
        if (!users || users.length === 0) {
            console.log('❌ No users found to upload. Please add users to the "users" array.');
            process.exit();
        }

        console.log(`📊 Found ${users.length} user(s) to process...`);

        let successCount = 0;
        let skipCount = 0;
        let errorCount = 0;

        // Check for duplicate phone numbers in the input array itself
        const phoneMap = {};
        const duplicatesInFile = [];

        users.forEach((user, index) => {
            if (phoneMap[user.phone]) {
                duplicatesInFile.push({ ...user, duplicateOfIndex: phoneMap[user.phone] });
            } else {
                phoneMap[user.phone] = index;
            }
        });

        if (duplicatesInFile.length > 0) {
            console.log('⚠️  The following users have DUPLICATE phone numbers in this file:');
            duplicatesInFile.forEach(d => {
                console.log(`   - Name: ${d.name}, Phone: ${d.phone}, Email: ${d.email} (Duplicate of entry at index ${d.duplicateOfIndex})`);
            });
            console.log('\nProcessing will continue, but duplicates will be skipped based on database constraints...\n');
        }

        for (const user of users) {
            try {
                // Check if phone already exists
                const existingUser = await User.findOne({ phone: user.phone });

                if (existingUser) {
                    console.log(`⚠️  Skipping ${user.name || user.phone}: Phone number already exists.`);
                    skipCount++;
                    continue;
                }

                await User.create(user);
                console.log(`✅ Created user: ${user.name || user.phone}`);
                successCount++;
            } catch (err) {
                console.error(`❌ Error creating ${user.name || user.phone}: ${err.message}`);
                errorCount++;
            }
        }

        console.log('-----------------------------------');
        console.log(`✨ Upload Complete!`);
        console.log(`✅ Added: ${successCount}`);
        console.log(`⚠️  Skipped (Duplicate): ${skipCount}`);
        console.log(`❌ Failed: ${errorCount}`);

        process.exit();
    } catch (error) {
        console.error(`❌ Fatal Error: ${error.message}`);
        process.exit(1);
    }
};

importUsers();
