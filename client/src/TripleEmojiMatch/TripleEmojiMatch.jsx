import { useState } from "react";
import Emoji from "./Emoji";
import ModeExplaination from "../ModeExplaination";
import { emojiPics } from "./imagesGroup";
import E00 from "./images/000.jpg";

export default function TripleEmojiMatch() {
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [emojis, setEmojis] = useState([
    {id:0, image: emojiPics[0], isSelected: false},
    {id:1, image: emojiPics[1], isSelected: false},
    {id:2, image: emojiPics[2], isSelected: false},
    {id:3, image: emojiPics[3], isSelected: false},
    {id:4, image: emojiPics[4], isSelected: false},
    {id:5, image: emojiPics[5], isSelected: false},
    {id:6, image: emojiPics[6], isSelected: false},
    {id:7, image: emojiPics[7], isSelected: false},
    {id:8, image: emojiPics[8], isSelected: false},
    {id:9, image: emojiPics[9], isSelected: false},
    {id:10, image: emojiPics[10], isSelected: false},
    {id:11, image: emojiPics[11], isSelected: false},
    {id:12, image: emojiPics[12], isSelected: false},
    {id:13, image: emojiPics[13], isSelected: false},
    {id:14, image: emojiPics[14], isSelected: false},
    {id:15, image: emojiPics[15], isSelected: false},
    {id:16, image: emojiPics[16], isSelected: false},
    {id:17, image: emojiPics[17], isSelected: false},
    {id:18, image: emojiPics[18], isSelected: false},
    {id:19, image: emojiPics[19], isSelected: false},
    {id:20, image: emojiPics[20], isSelected: false},
    {id:21, image: emojiPics[21], isSelected: false},
    {id:22, image: emojiPics[22], isSelected: false},
    {id:23, image: emojiPics[23], isSelected: false},
    {id:24, image: emojiPics[24], isSelected: false},
    {id:25, image: emojiPics[25], isSelected: false},
    {id:26, image: emojiPics[26], isSelected: false},
    {id:27, image: emojiPics[27], isSelected: false},
    {id:28, image: emojiPics[28], isSelected: false},
    {id:29, image: emojiPics[29], isSelected: false},
    {id:30, image: emojiPics[30], isSelected: false},
    {id:31, image: emojiPics[31], isSelected: false},
    {id:32, image: emojiPics[32], isSelected: false},
    {id:33, image: emojiPics[33], isSelected: false},
    {id:34, image: emojiPics[34], isSelected: false},
    {id:35, image: emojiPics[35], isSelected: false},
    {id:36, image: emojiPics[36], isSelected: false},
    {id:37, image: emojiPics[37], isSelected: false},
    {id:38, image: emojiPics[38], isSelected: false},
    {id:39, image: emojiPics[39], isSelected: false},
    {id:40, image: emojiPics[40], isSelected: false},
    {id:41, image: emojiPics[41], isSelected: false},
    {id:42, image: emojiPics[42], isSelected: false},
    {id:43, image: emojiPics[43], isSelected: false},
    {id:44, image: emojiPics[44], isSelected: false},
    {id:45, image: emojiPics[45], isSelected: false},
    {id:46, image: emojiPics[46], isSelected: false},
    {id:47, image: emojiPics[47], isSelected: false},
    {id:48, image: emojiPics[48], isSelected: false},
    {id:49, image: emojiPics[49], isSelected: false},
    {id:50, image: emojiPics[50], isSelected: false},
    {id:51, image: emojiPics[51], isSelected: false},
    {id:52, image: emojiPics[52], isSelected: false},
    {id:53, image: emojiPics[53], isSelected: false},
    {id:54, image: emojiPics[54], isSelected: false},
    {id:55, image: emojiPics[55], isSelected: false},
    {id:56, image: emojiPics[56], isSelected: false},
    {id:57, image: emojiPics[57], isSelected: false},
    {id:58, image: emojiPics[58], isSelected: false},
    {id:59, image: emojiPics[59], isSelected: false},
    {id:60, image: emojiPics[60], isSelected: false},
    {id:61, image: emojiPics[61], isSelected: false},
    {id:62, image: emojiPics[62], isSelected: false},
    {id:63, image: emojiPics[63], isSelected: false},
    {id:64, image: emojiPics[64], isSelected: false},
    {id:65, image: emojiPics[65], isSelected: false},
    {id:66, image: emojiPics[66], isSelected: false},
    {id:67, image: emojiPics[67], isSelected: false},
    {id:68, image: emojiPics[68], isSelected: false},
    {id:69, image: emojiPics[69], isSelected: false},
    {id:70, image: emojiPics[70], isSelected: false},
    {id:71, image: emojiPics[71], isSelected: false},
    {id:72, image: emojiPics[72], isSelected: false},
    {id:73, image: emojiPics[73], isSelected: false},
    {id:74, image: emojiPics[74], isSelected: false},
    {id:75, image: emojiPics[75], isSelected: false},
    {id:76, image: emojiPics[76], isSelected: false},
    {id:77, image: emojiPics[77], isSelected: false},
    {id:78, image: emojiPics[78], isSelected: false},
    {id:79, image: emojiPics[79], isSelected: false},
    {id:80, image: emojiPics[0], isSelected: false},
    {id:81, image: emojiPics[1], isSelected: false},
    {id:82, image: emojiPics[2], isSelected: false},
    {id:83, image: emojiPics[3], isSelected: false},
    {id:84, image: emojiPics[4], isSelected: false},
    {id:85, image: emojiPics[5], isSelected: false},
    {id:86, image: emojiPics[6], isSelected: false},
    {id:87, image: emojiPics[7], isSelected: false},
    {id:88, image: emojiPics[8], isSelected: false},
    {id:89, image: emojiPics[9], isSelected: false},
    {id:90, image: emojiPics[10], isSelected: false},
    {id:91, image: emojiPics[11], isSelected: false},
    {id:92, image: emojiPics[12], isSelected: false},
    {id:93, image: emojiPics[13], isSelected: false},
    {id:94, image: emojiPics[14], isSelected: false},
    {id:95, image: emojiPics[15], isSelected: false},
    {id:96, image: emojiPics[16], isSelected: false},
    {id:97, image: emojiPics[17], isSelected: false},
    {id:98, image: emojiPics[18], isSelected: false},
    {id:99, image: emojiPics[19], isSelected: false},
    {id:100, image: emojiPics[20], isSelected: false},
    {id:101, image: emojiPics[21], isSelected: false},
    {id:102, image: emojiPics[22], isSelected: false},
    {id:103, image: emojiPics[23], isSelected: false},
    {id:104, image: emojiPics[24], isSelected: false},
    {id:105, image: emojiPics[25], isSelected: false},
    {id:106, image: emojiPics[26], isSelected: false},
    {id:107, image: emojiPics[27], isSelected: false},
    {id:108, image: emojiPics[28], isSelected: false},
    {id:109, image: emojiPics[29], isSelected: false},
    {id:110, image: emojiPics[30], isSelected: false},
    {id:111, image: emojiPics[31], isSelected: false},
    {id:112, image: emojiPics[32], isSelected: false},
    {id:113, image: emojiPics[33], isSelected: false},
    {id:114, image: emojiPics[34], isSelected: false},
    {id:115, image: emojiPics[35], isSelected: false},
    {id:116, image: emojiPics[36], isSelected: false},
    {id:117, image: emojiPics[37], isSelected: false},
    {id:118, image: emojiPics[38], isSelected: false},
    {id:119, image: emojiPics[39], isSelected: false},
    {id:120, image: emojiPics[40], isSelected: false},
    {id:121, image: emojiPics[41], isSelected: false},
    {id:122, image: emojiPics[42], isSelected: false},
    {id:123, image: emojiPics[43], isSelected: false},
    {id:124, image: emojiPics[44], isSelected: false},
    {id:125, image: emojiPics[45], isSelected: false},
    {id:126, image: emojiPics[46], isSelected: false},
    {id:127, image: emojiPics[47], isSelected: false},
    {id:128, image: emojiPics[48], isSelected: false},
    {id:129, image: emojiPics[49], isSelected: false},
    {id:130, image: emojiPics[50], isSelected: false},
    {id:131, image: emojiPics[51], isSelected: false},
    {id:132, image: emojiPics[52], isSelected: false},
    {id:133, image: emojiPics[53], isSelected: false},
    {id:134, image: emojiPics[54], isSelected: false},
    {id:135, image: emojiPics[55], isSelected: false},
    {id:136, image: emojiPics[56], isSelected: false},
    {id:137, image: emojiPics[57], isSelected: false},
    {id:138, image: emojiPics[58], isSelected: false},
    {id:139, image: emojiPics[59], isSelected: false},
    {id:140, image: emojiPics[60], isSelected: false},
    {id:141, image: emojiPics[61], isSelected: false},
    {id:142, image: emojiPics[62], isSelected: false},
    {id:143, image: emojiPics[63], isSelected: false},
    {id:144, image: emojiPics[64], isSelected: false},
    {id:145, image: emojiPics[65], isSelected: false},
    {id:146, image: emojiPics[66], isSelected: false},
    {id:147, image: emojiPics[67], isSelected: false},
    {id:148, image: emojiPics[68], isSelected: false},
    {id:149, image: emojiPics[69], isSelected: false},
    {id:150, image: emojiPics[70], isSelected: false},
    {id:151, image: emojiPics[71], isSelected: false},
    {id:152, image: emojiPics[72], isSelected: false},
    {id:153, image: emojiPics[73], isSelected: false},
    {id:154, image: emojiPics[74], isSelected: false},
    {id:155, image: emojiPics[75], isSelected: false},
    {id:156, image: emojiPics[76], isSelected: false},
    {id:157, image: emojiPics[77], isSelected: false},
    {id:158, image: emojiPics[78], isSelected: false},
    {id:159, image: emojiPics[79], isSelected: false},
    {id:160, image: emojiPics[0], isSelected: false},
    {id:161, image: emojiPics[1], isSelected: false},
    {id:162, image: emojiPics[2], isSelected: false},
    {id:163, image: emojiPics[3], isSelected: false},
    {id:164, image: emojiPics[4], isSelected: false},
    {id:165, image: emojiPics[5], isSelected: false},
    {id:166, image: emojiPics[6], isSelected: false},
    {id:167, image: emojiPics[7], isSelected: false},
    {id:168, image: emojiPics[8], isSelected: false},
    {id:169, image: emojiPics[9], isSelected: false},
    {id:170, image: emojiPics[10], isSelected: false},
    {id:171, image: emojiPics[11], isSelected: false},
    {id:172, image: emojiPics[12], isSelected: false},
    {id:173, image: emojiPics[13], isSelected: false},
    {id:174, image: emojiPics[14], isSelected: false},
    {id:175, image: emojiPics[15], isSelected: false},
    {id:176, image: emojiPics[16], isSelected: false},
    {id:177, image: emojiPics[17], isSelected: false},
    {id:178, image: emojiPics[18], isSelected: false},
    {id:179, image: emojiPics[19], isSelected: false},
    {id:180, image: emojiPics[20], isSelected: false},
    {id:181, image: emojiPics[21], isSelected: false},
    {id:182, image: emojiPics[22], isSelected: false},
    {id:183, image: emojiPics[23], isSelected: false},
    {id:184, image: emojiPics[24], isSelected: false},
    {id:185, image: emojiPics[25], isSelected: false},
    {id:186, image: emojiPics[26], isSelected: false},
    {id:187, image: emojiPics[27], isSelected: false},
    {id:188, image: emojiPics[28], isSelected: false},
    {id:189, image: emojiPics[29], isSelected: false},
    {id:190, image: emojiPics[30], isSelected: false},
    {id:191, image: emojiPics[31], isSelected: false},
    {id:192, image: emojiPics[32], isSelected: false},
    {id:193, image: emojiPics[33], isSelected: false},
    {id:194, image: emojiPics[34], isSelected: false},
    {id:195, image: emojiPics[35], isSelected: false},
    {id:196, image: emojiPics[36], isSelected: false},
    {id:197, image: emojiPics[37], isSelected: false},
    {id:198, image: emojiPics[38], isSelected: false},
    {id:199, image: emojiPics[39], isSelected: false},
    {id:200, image: emojiPics[40], isSelected: false},
    {id:201, image: emojiPics[41], isSelected: false},
    {id:202, image: emojiPics[42], isSelected: false},
    {id:203, image: emojiPics[43], isSelected: false},
    {id:204, image: emojiPics[44], isSelected: false},
    {id:205, image: emojiPics[45], isSelected: false},
    {id:206, image: emojiPics[46], isSelected: false},
    {id:207, image: emojiPics[47], isSelected: false},
    {id:208, image: emojiPics[48], isSelected: false},
    {id:209, image: emojiPics[49], isSelected: false},
    {id:210, image: emojiPics[50], isSelected: false},
    {id:211, image: emojiPics[51], isSelected: false},
    {id:212, image: emojiPics[52], isSelected: false},
    {id:213, image: emojiPics[53], isSelected: false},
    {id:214, image: emojiPics[54], isSelected: false},
    {id:215, image: emojiPics[55], isSelected: false},
    {id:216, image: emojiPics[56], isSelected: false},
    {id:217, image: emojiPics[57], isSelected: false},
    {id:218, image: emojiPics[58], isSelected: false},
    {id:219, image: emojiPics[59], isSelected: false},
    {id:220, image: emojiPics[60], isSelected: false},
    {id:221, image: emojiPics[61], isSelected: false},
    {id:222, image: emojiPics[62], isSelected: false},
    {id:223, image: emojiPics[63], isSelected: false},
    {id:224, image: emojiPics[64], isSelected: false},
    {id:225, image: emojiPics[65], isSelected: false},
    {id:226, image: emojiPics[66], isSelected: false},
    {id:227, image: emojiPics[67], isSelected: false},
    {id:228, image: emojiPics[68], isSelected: false},
    {id:229, image: emojiPics[69], isSelected: false},
    {id:230, image: emojiPics[70], isSelected: false},
    {id:231, image: emojiPics[71], isSelected: false},
    {id:232, image: emojiPics[72], isSelected: false},
    {id:233, image: emojiPics[73], isSelected: false},
    {id:234, image: emojiPics[74], isSelected: false},
    {id:235, image: emojiPics[75], isSelected: false},
    {id:236, image: emojiPics[76], isSelected: false},
    {id:237, image: emojiPics[77], isSelected: false},
    {id:238, image: emojiPics[78], isSelected: false},
    {id:239, image: emojiPics[79], isSelected: false}
  ]);
  const [selectedEmojis, setSelectedEmojis] = useState ([
    {id:1, image: E00, isFilled: false},
    {id:2, image: E00, isFilled: false},
    {id:3, image: E00, isFilled: false},
    {id:4, image: E00, isFilled: false},
    {id:5, image: E00, isFilled: false},
    {id:6, image: E00, isFilled: false},
    {id:7, image: E00, isFilled: false}
  ])
  const runEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
    setIsGameStarted(true);
  };
  const runNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
    setIsGameStarted(true);
  };
  return (
    <div>
      <h2>Triple Emoji Match</h2>
      {!isGameStarted && !easyMode && !normalMode && (
        <div>
          <button onClick={runEasyMode}>Easy Mode</button>
          <button onClick={runNormalMode}>Normal Mode</button>
        </div>
      )}
      {easyMode && !normalMode ? (
        <ModeExplaination message="Easy Mode: There's no timer. You won't get any stars if you win." />
      ) : (
        !easyMode &&
        normalMode && (
          <ModeExplaination message="Normal Mode: Find all the matches in *** seconds. You will get one star if you win." />
        )
      )}
      {isGameStarted && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, auto)",
            justifyContent: "center",
          }}
        >
        {selectedEmojis.map((selectedEmoji) => (
          <Emoji
            key={selectedEmojis.indexOf(selectedEmoji)}
            imgId={selectedEmojis.indexOf(selectedEmoji)}
            imgSrc={selectedEmoji.image}
            emojis={emojis}
            setEmojis={setEmojis}
            selectedEmojis={selectedEmojis}
            setSelectedEmojis={setSelectedEmojis}
          />
        ))}
        </div>
      )}
      {isGameStarted && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(20, auto)",
            justifyContent: "center",
          }}
        >
          {emojis.map((emoji) => (
            <Emoji
              key={emoji.id}
              imgId={emoji.id}
              imgSrc={emoji.image}
              emojis={emojis}
              setEmojis={setEmojis}
              selectedEmojis={selectedEmojis}
              setSelectedEmojis={setSelectedEmojis}
            />
          ))}
        </div>
      )}
    </div>
  );
}
