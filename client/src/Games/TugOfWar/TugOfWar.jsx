import { useState, useEffect } from "react";
import Match from "./Match";
import Dice1 from "./images/001.jpg";
import Dice2 from "./images/002.jpg";
import Dice3 from "./images/003.jpg";
import Dice4 from "./images/004.jpg";
import Dice5 from "./images/005.jpg";
import Dice6 from "./images/006.jpg";
import Blue1 from "./images/Blue-1.jpg";
import Blue2 from "./images/Blue-2.jpg";
import Blue3 from "./images/Blue-3.jpg";
import Blue4 from "./images/Blue-4.jpg";
import Blue5 from "./images/Blue-5.jpg";
import Red1 from "./images/Red-1.jpg";
import Red2 from "./images/Red-2.jpg";
import Red3 from "./images/Red-3.jpg";
import Red4 from "./images/Red-4.jpg";
import Red5 from "./images/Red-5.jpg";
import V1 from "./images/V-1.jpg";
import V2 from "./images/V-2.jpg";
import V3 from "./images/V-3.jpg";
import ModeExplaination from "../ModeExplaination";
import ConfirmationBox from "../ConfirmationBox";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../../Components/ReviewSection";

export default function TugOfWar({updateTotalPoint}) {
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userColor, setUserColor] = useState("");
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [dice, setDice] = useState(-1);
  const [isDiceUpdated, setIsDiceUpdated] = useState(false);
  const [matches, setMatches] = useState([
    {matchName: "match1", isMatchSelected: false, matchValue: [Blue1, V1, V1, V1, V1, V1, V1, V2, V1, V1, V1, V1, V1, V1, Red1]},
    {matchName: "match2", isMatchSelected: false, matchValue: [Blue1, V1, V1, V1, V1, V1, V1, V2, V1, V1, V1, V1, V1, V1, Red1]},
    {matchName: "match3", isMatchSelected: false, matchValue: [Blue1, V1, V1, V1, V1, V1, V1, V2, V1, V1, V1, V1, V1, V1, Red1]}
  ]);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [finishedMatches, setFinishedMatches] = useState([]);
  const [availableMatches, setAvailableMatches] = useState(["match1", "match2", "match3"]);
  const [userScore, setUserScore] = useState(0);
  const [pejmanScore, setPejmanScore] = useState(0);
  const [finalMessage, setFinalMessage] = useState("");
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);

  const navigate = useNavigate();
  const handleEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const handleNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const handleStart = () => {
    setIsGameStarted(true);
    setIsUserTurn(true);
  };
  const handleUserColor = (e) => {
    if (e.target.value === "Red") {
      setUserColor("Red");
    } else if (e.target.value === "Blue") {
      setUserColor("Blue");
    }
  };
  const rollDice = () => {
    setMatches((currMatches) => currMatches.map((m) =>
        m.isMatchSelected === true ? {...m, isMatchSelected: false} : m
    ));
    setSelectedMatch("");
    setDice(0);
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      setDice(randomNumber);
    }, 1000);
    setIsDiceUpdated(true);
    if (!isUserTurn) {
        if (easyMode) {
            setSelectedMatch(availableMatches[Math.floor(Math.random() * availableMatches.length)]);
        }
        setMatches((currMatches) => currMatches.map((m) =>
        m.matchName === selectedMatch ? {...m, isMatchSelected: true} : m
    ))
    }
  };
  const replaceElement = (firstEl, secondEl) => {
    setMatches(currMatches =>
    currMatches.map(match =>
        match.matchName === selectedMatch
        ? {
            ...match,
            matchValue: match.matchValue.map(value =>
                value === firstEl ? secondEl : value
            )
            }
        : match
    )
    );
  };
  const swapElements = (indexl, index2) => {
    setMatches(currMatches =>
    currMatches.map(match => {
            if (match.matchName !== selectedMatch) return match;
            const values = [...match.matchValue];
            [values[indexl], values[index2]] = [values[index2], values[indexl]];
            return {
                ...match,
                matchValue: values
            };
        })
    );
  };
  const updateRopes = () => {
    replaceElement(V1, V3);
    replaceElement(V2, V3);
  }
  const userAct = () => {
    const match = (matches.find(m => m.matchName === selectedMatch))?.matchValue;
    if (userColor === "Blue") {
        if (match?.indexOf(V2) - dice < 1) {
            replaceElement(match[0], Blue4);
            replaceElement(match[14], Red5);
            updateRopes();
            swapElements(match?.indexOf(V2), match?.indexOf(V2) + 1);
            setUserScore(currUserScore => currUserScore + 1);
            setFinishedMatches(currFinishedMatches => [...currFinishedMatches, selectedMatch]);
            setAvailableMatches(availableMatches.filter (el => el !== selectedMatch));
        } else {
            replaceElement(match[0], Blue2);
            replaceElement(match[14], Red3);
            swapElements(match?.indexOf(V2), match?.indexOf(V2) - dice);
        }
    } else if (userColor === "Red") {
        if (match?.indexOf(V2) + dice > 13) {
            replaceElement(match[14], Red4);
            replaceElement(match[0], Blue5);
            updateRopes();
            swapElements(match?.indexOf(V2), match?.indexOf(V2) - 1);
            setUserScore(currUserScore => currUserScore + 1);
            setFinishedMatches(currFinishedMatches => [...currFinishedMatches, selectedMatch]);
            setAvailableMatches(availableMatches.filter (el => el !== selectedMatch));
        } else {
            replaceElement(match[14], Red2);
            replaceElement(match[0], Blue3);
            swapElements(match?.indexOf(V2), match?.indexOf(V2) + dice);
        }
    }
    setMatches((currMatches) => currMatches.map((m) =>
        m.isMatchSelected === true ? {...m, isMatchSelected: false} : m
    ));
    setIsDiceUpdated(false);
    setIsUserTurn(false);
  };
  const pejmanAct = () => {
    const match = (matches.find(m => m.matchName === selectedMatch))?.matchValue;
    if (userColor === "Blue") {
        if (match?.indexOf(V2) + dice > 13) {
            replaceElement(match[0], Blue5);
            replaceElement(match[14], Red4);
            updateRopes();
            swapElements(match?.indexOf(V2), match?.indexOf(V2) - 1);
            setPejmanScore(currPejmanScore => currPejmanScore + 1);
            setFinishedMatches(currFinishedMatches => [...currFinishedMatches, selectedMatch]);
            setAvailableMatches(availableMatches.filter (el => el !== selectedMatch));
        } else {   
            replaceElement(match[0], Blue3);
            replaceElement(match[14], Red2);
            swapElements(match?.indexOf(V2), match?.indexOf(V2) + dice);
        }
    } else if (userColor === "Red") {
        if (match?.indexOf(V2) - dice < 1) {
            replaceElement(match[14], Red5);
            replaceElement(match[0], Blue4);
            updateRopes();
            swapElements(match?.indexOf(V2), match?.indexOf(V2) + 1);
            setPejmanScore(currPejmanScore => currPejmanScore + 1);
            setFinishedMatches(currFinishedMatches => [...currFinishedMatches, selectedMatch]);
            setAvailableMatches(availableMatches.filter (el => el !== selectedMatch));
        } else {
            replaceElement(match[14], Red3);
            replaceElement(match[0], Blue2);
            swapElements(match?.indexOf(V2), match?.indexOf(V2) - dice);
        }
    }
    setIsDiceUpdated(false);
    setSelectedMatch("");
    setDice(-1);
    setIsUserTurn(true);
  };

  const handlePlayAgain = () => {
    setIsUserTurn(true);
    setDice(-1);
    setIsDiceUpdated(false);
    setMatches([
        {matchName: "match1", isMatchSelected: false, matchValue: [Blue1, V1, V1, V1, V1, V1, V1, V2, V1, V1, V1, V1, V1, V1, Red1]},
        {matchName: "match2", isMatchSelected: false, matchValue: [Blue1, V1, V1, V1, V1, V1, V1, V2, V1, V1, V1, V1, V1, V1, Red1]},
        {matchName: "match3", isMatchSelected: false, matchValue: [Blue1, V1, V1, V1, V1, V1, V1, V2, V1, V1, V1, V1, V1, V1, Red1]}
    ]);
    setSelectedMatch("");
    setFinishedMatches([]);
    setAvailableMatches(["match1", "match2", "match3"]);
    setUserScore(0);
    setPejmanScore(0);
    setFinalMessage("");
    setIsTogglingLevel(false);
    setIsTogglingHomePage(false);
  }
  const toggleReset = () => {
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    setEasyMode(false);
    setNormalMode(false);
    setIsGameStarted(false);
    setUserColor("");
    setIsTogglingReset(false);
    setIsTogglingLevel(false);
    handlePlayAgain();
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
    const toggleLevel = () => {
    setIsTogglingLevel(true);
  };
  const toggleLevelYes = () => {
    if (easyMode) {
      setEasyMode(false);
      setNormalMode(true);
    } else if (normalMode) {
      setNormalMode(false);
      setEasyMode(true);
    }
    handlePlayAgain();
  };
  const toggleLevelCancel = () => {
    setIsTogglingLevel(false);
  };
  const toggleHomePage = () => {
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    navigate("/");
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
  };
  useEffect(() => {
        if (!isUserTurn && isDiceUpdated && normalMode) {
            // user's color is "Blue":
            if (userColor === "Blue") {
                // Main Condition 1:
                if (userScore === 0 && pejmanScore === 0) {
                    // User is in a beeter situation in all 3 matches:
                    if (matches[0]?.matchValue?.indexOf(V2) < 8 && matches[1]?.matchValue?.indexOf(V2) < 8 && matches[2]?.matchValue?.indexOf(V2) < 8) {
                        if (dice === 4 || dice === 5 || dice === 6) {
                            // Choose user's best:
                            if (matches[0]?.matchValue?.indexOf(V2) <= matches[1]?.matchValue?.indexOf(V2) &&
                                matches[0]?.matchValue?.indexOf(V2) <= matches[2]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[0].matchName);
                                }
                            else if (matches[1]?.matchValue?.indexOf(V2) <= matches[0]?.matchValue?.indexOf(V2) &&
                                matches[1]?.matchValue?.indexOf(V2) <= matches[2]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[1].matchName);
                                }
                            else if (matches[2]?.matchValue?.indexOf(V2) <= matches[0]?.matchValue?.indexOf(V2) &&
                                matches[2]?.matchValue?.indexOf(V2) <= matches[1]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[2].matchName);
                                }
                        } else {
                            // Choose user's worst:
                            if (matches[0]?.matchValue?.indexOf(V2) >= matches[1]?.matchValue?.indexOf(V2) &&
                                matches[0]?.matchValue?.indexOf(V2) >= matches[2]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[0].matchName);
                                }
                            else if (matches[1]?.matchValue?.indexOf(V2) >= matches[0]?.matchValue?.indexOf(V2) &&
                                matches[1]?.matchValue?.indexOf(V2) >= matches[2]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[1].matchName);
                                }
                            else if (matches[2]?.matchValue?.indexOf(V2) >= matches[0]?.matchValue?.indexOf(V2) &&
                                matches[2]?.matchValue?.indexOf(V2) >= matches[1]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[2].matchName);
                                }
                        }
                    }
                    // We are in a beeter situation in all 3 matches:
                    else if (matches[0]?.matchValue?.indexOf(V2) > 7 && matches[1]?.matchValue?.indexOf(V2) > 7 && matches[2]?.matchValue?.indexOf(V2) > 7) {
                        // We can win 1 match:
                        if (matches[0]?.matchValue?.indexOf(V2) + dice > 13 && matches[1]?.matchValue?.indexOf(V2) + dice < 14 && matches[2]?.matchValue?.indexOf(V2) + dice < 14) {
                            // Choose match1:
                            setSelectedMatch(matches[0].matchName);
                        }
                        else if (matches[0]?.matchValue?.indexOf(V2) + dice < 14 && matches[1]?.matchValue?.indexOf(V2) + dice > 13 && matches[2]?.matchValue?.indexOf(V2) + dice < 14) {
                            // Choose match2:
                            setSelectedMatch(matches[1].matchName);
                        }
                        else if (matches[0]?.matchValue?.indexOf(V2) + dice < 14 && matches[1]?.matchValue?.indexOf(V2) + dice < 14 && matches[2]?.matchValue?.indexOf(V2) + dice > 13) {
                            // Choose match3:
                            setSelectedMatch(matches[2].matchName);
                        } 
                        // We can win 2 matches:
                        else if (matches[0]?.matchValue?.indexOf(V2) + dice > 13 && matches[1]?.matchValue?.indexOf(V2) + dice > 13 && matches[2]?.matchValue?.indexOf(V2) + dice < 14) {
                            // Choose the lightest win:
                            if (matches[0]?.matchValue?.indexOf(V2) < matches[1]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                            } else {
                                setSelectedMatch(matches[1].matchName);
                            }
                        }
                        else if (matches[0]?.matchValue?.indexOf(V2) + dice > 13 && matches[1]?.matchValue?.indexOf(V2) + dice < 14 && matches[2]?.matchValue?.indexOf(V2) + dice > 13) {
                            // Choose the lightest win:
                            if (matches[0]?.matchValue?.indexOf(V2) < matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                            } else {
                                setSelectedMatch(matches[2].matchName);
                            }
                        }
                        else if (matches[0]?.matchValue?.indexOf(V2) + dice < 14 && matches[1]?.matchValue?.indexOf(V2) + dice > 13 && matches[2]?.matchValue?.indexOf(V2) + dice > 13) {
                            // Choose the lightest win:
                            if (matches[1]?.matchValue?.indexOf(V2) < matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[1].matchName);
                            } else {
                                setSelectedMatch(matches[2].matchName);
                            }
                        }
                        // We can win 3 matches:
                        else if (matches[0]?.matchValue?.indexOf(V2) + dice > 13 && matches[1]?.matchValue?.indexOf(V2) + dice > 13 && matches[2]?.matchValue?.indexOf(V2) + dice > 13) {
                            // Choose the lightest win:
                            if (matches[0]?.matchValue?.indexOf(V2) <= matches[1]?.matchValue?.indexOf(V2) && matches[0]?.matchValue?.indexOf(V2) <= matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                            } else if (matches[1]?.matchValue?.indexOf(V2) <= matches[0]?.matchValue?.indexOf(V2) && matches[1]?.matchValue?.indexOf(V2) <= matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[1].matchName);
                            } else if (matches[2]?.matchValue?.indexOf(V2) <= matches[0]?.matchValue?.indexOf(V2) && matches[2]?.matchValue?.indexOf(V2) <= matches[1]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[2].matchName);
                            }
                        }
                        // We can't win in any match:
                        else if (matches[0]?.matchValue?.indexOf(V2) + dice < 14 && matches[1]?.matchValue?.indexOf(V2) + dice < 14 && matches[2]?.matchValue?.indexOf(V2) + dice < 14) {
                            // Choose our best option:
                            if (matches[0]?.matchValue?.indexOf(V2) >= matches[1]?.matchValue?.indexOf(V2) && matches[0]?.matchValue?.indexOf(V2) >= matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                            } else if (matches[1]?.matchValue?.indexOf(V2) >= matches[0]?.matchValue?.indexOf(V2) && matches[1]?.matchValue?.indexOf(V2) >= matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[1].matchName);
                            } else if (matches[2]?.matchValue?.indexOf(V2) >= matches[0]?.matchValue?.indexOf(V2) && matches[2]?.matchValue?.indexOf(V2) >= matches[1]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[2].matchName);
                            }
                        }
                    }
                    // We are in a beter situation in 2 matches:
                    // We are better in "match1" and "match2":
                    else if (matches[0]?.matchValue?.indexOf(V2) > 7 && matches[1]?.matchValue?.indexOf(V2) > 7 && matches[2]?.matchValue?.indexOf(V2) < 8) {
                        // We win "match1" and "match2":
                        if (matches[0]?.matchValue?.indexOf(V2) + dice > 13 && matches[1]?.matchValue?.indexOf(V2) + dice > 13) {
                            // Choose the lightest:
                            if (matches[0]?.matchValue?.indexOf(V2) < matches[1]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                            } else {
                                setSelectedMatch(matches[1].matchName);
                            }
                        }
                        // We win "match1":
                        else if (matches[0]?.matchValue?.indexOf(V2) + dice > 13 && matches[1]?.matchValue?.indexOf(V2) + dice <= 13) {
                            // Choose "match1":
                            setSelectedMatch(matches[0].matchName);
                        }
                        // We win "match2":
                        else if (matches[0]?.matchValue?.indexOf(V2) + dice <= 13 && matches[1]?.matchValue?.indexOf(V2) + dice > 13) {
                            // Choose "match2":
                            setSelectedMatch(matches[1].matchName);
                        }
                        // We neither win "match1" nor "match2":
                        else if (matches[0]?.matchValue?.indexOf(V2) + dice <= 13 && matches[1]?.matchValue?.indexOf(V2) + dice <= 13) {
                            // The user needs 1 to win match3:
                            if (matches[2]?.matchValue?.indexOf(V2) === 1) {
                                // Choose match3:
                                setSelectedMatch(matches[2].matchName);
                            } else {
                                // Choose the closer between match1 or match2:
                                if (matches[0]?.matchValue?.indexOf(V2) > matches[1]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                                } else {
                                    setSelectedMatch(matches[1].matchName);
                                }
                            }
                        }
                    }
                    // We are better in "match1" and "match3":
                    else if (matches[0]?.matchValue?.indexOf(V2) > 7 && matches[1]?.matchValue?.indexOf(V2) < 8 && matches[2]?.matchValue?.indexOf(V2) > 7) {
                        // We win "match1" and "match3":
                        if (matches[0]?.matchValue?.indexOf(V2) + dice > 13 && matches[2]?.matchValue?.indexOf(V2) + dice > 13) {
                            // Choose the lightest:
                            if (matches[0]?.matchValue?.indexOf(V2) < matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                            } else {
                                setSelectedMatch(matches[2].matchName);
                            }
                        }
                        // We win "match1":
                        else if (matches[0]?.matchValue?.indexOf(V2) + dice > 13 && matches[2]?.matchValue?.indexOf(V2) + dice <= 13) {
                            // Choose "match1":
                            setSelectedMatch(matches[0].matchName);
                        }
                        // We win "match3":
                        else if (matches[0]?.matchValue?.indexOf(V2) + dice <= 13 && matches[2]?.matchValue?.indexOf(V2) + dice > 13) {
                            // Choose "match3":
                            setSelectedMatch(matches[2].matchName);
                        }
                        // We neither win "match1" nor "match3":
                        else if (matches[0]?.matchValue?.indexOf(V2) + dice <= 13 && matches[2]?.matchValue?.indexOf(V2) + dice <= 13) {
                            // The user needs 1 to win match2
                            if (matches[1]?.matchValue?.indexOf(V2) === 1) {
                                // Choose match2:
                                setSelectedMatch(matches[1].matchName);
                            } else {
                                // Choose the closer between match1 or match3:
                                if (matches[0]?.matchValue?.indexOf(V2) > matches[2]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[0].matchName);
                                } else {
                                    setSelectedMatch(matches[2].matchName);
                                }
                            }
                        }
                    }
                    // We are better in "match2" and "match3":
                    else if (matches[0]?.matchValue?.indexOf(V2) < 8 && matches[1]?.matchValue?.indexOf(V2) > 7 && matches[2]?.matchValue?.indexOf(V2) > 7) {
                        // We win "match2" and "match3":
                        if (matches[1]?.matchValue?.indexOf(V2) + dice > 13 && matches[2]?.matchValue?.indexOf(V2) + dice > 13) {
                            // Choose the lightest:
                            if (matches[1]?.matchValue?.indexOf(V2) < matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[1].matchName);
                            } else {
                                setSelectedMatch(matches[2].matchName);
                            }
                        }
                        // We win "match2":
                        else if (matches[1]?.matchValue?.indexOf(V2) + dice > 13 && matches[2]?.matchValue?.indexOf(V2) + dice <= 13) {
                            // Choose "match2":
                            setSelectedMatch(matches[1].matchName);
                        }
                        // We win "match3":
                        else if (matches[1]?.matchValue?.indexOf(V2) + dice <= 13 && matches[2]?.matchValue?.indexOf(V2) + dice > 13) {
                            // Choose "match3":
                            setSelectedMatch(matches[2].matchName);
                        }
                        // We neither win "match2" nor "match3":
                        else if (matches[1]?.matchValue?.indexOf(V2) + dice <= 13 && matches[2]?.matchValue?.indexOf(V2) + dice <= 13) {
                            // The user needs 1 to win match1
                            if (matches[0]?.matchValue?.indexOf(V2) === 1) {
                                // Choose match1:
                                setSelectedMatch(matches[0].matchName);
                            } else {
                                // Choose the closer between match2 or match3:
                                if (matches[1]?.matchValue?.indexOf(V2) > matches[2]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[1].matchName);
                                } else {
                                    setSelectedMatch(matches[2].matchName);
                                }
                            }
                        }

                    }
                    // We're better in 1 match:
                    // We're better in "match1":
                    else if (matches[0]?.matchValue?.indexOf(V2) > 7 && matches[1]?.matchValue?.indexOf(V2) < 8 && matches[2]?.matchValue?.indexOf(V2) < 8) {
                        // We win "match1":
                        if (matches[0]?.matchValue?.indexOf(V2) + dice > 13) {
                            // Choose "match1":
                            setSelectedMatch(matches[0].matchName);
                        } else if (dice > 3) {
                            // Choose the user's best:
                            if (matches[1]?.matchValue?.indexOf(V2) < matches[2]?.matchValue?.indexOf(V2)) {
                                // Choose "match2":
                                setSelectedMatch(matches[1].matchName);
                            } else {
                                // Choose "match3":
                                setSelectedMatch(matches[2].matchName);
                            }
                        } else {
                            // Choose "match1":
                            setSelectedMatch(matches[0].matchName);
                        }
                    }
                    // We're better in "match2":
                    else if (matches[0]?.matchValue?.indexOf(V2) < 8 && matches[1]?.matchValue?.indexOf(V2) > 7 && matches[2]?.matchValue?.indexOf(V2) < 8) {
                        // We win "match2":
                        if (matches[1]?.matchValue?.indexOf(V2) + dice > 13) {
                            // Choose "match2":
                            setSelectedMatch(matches[1].matchName);
                        } else if (dice > 3) {
                            // Choose the user's best:
                            if (matches[0]?.matchValue?.indexOf(V2) < matches[2]?.matchValue?.indexOf(V2)) {
                                // Choose "match1":
                            setSelectedMatch(matches[0].matchName);
                            } else {
                                // Choose "match3":
                                setSelectedMatch(matches[2].matchName);
                            }
                        } else {
                            // Choose "match2":
                            setSelectedMatch(matches[1].matchName);
                        }
                    }
                    // We're better in "match3":
                    else if (matches[0]?.matchValue?.indexOf(V2) < 8 && matches[1]?.matchValue?.indexOf(V2) < 8 && matches[2]?.matchValue?.indexOf(V2) > 7) {
                        // We win "match3":
                        if (matches[2]?.matchValue?.indexOf(V2) + dice > 13) {
                            // Choose "match3":
                            setSelectedMatch(matches[2].matchName);
                        } else if (dice > 3) {
                            // Choose the user's best:
                            if (matches[0]?.matchValue?.indexOf(V2) < matches[1]?.matchValue?.indexOf(V2)) {
                                // Choose "match1":
                            setSelectedMatch(matches[0].matchName);
                            } else {
                                // Choose "match2":
                                setSelectedMatch(matches[1].matchName);
                            }
                        } else {
                            // Choose "match3":
                            setSelectedMatch(matches[2].matchName);
                        }
                    }
                    else {
                        setSelectedMatch(availableMatches[Math.floor(Math.random() * availableMatches.length)]);
                    }
                }
                // Main Condition 2:
                else if (userScore === 1 && pejmanScore === 0) {
                    const matchA = availableMatches[0];
                    const matchB = availableMatches[1];
                    // We're better in both remaining matches:
                    if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > 7 &&
                        matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) > 7) {
                        // We win both remaining matches:
                        if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) + dice > 13 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) + dice > 13) {
                                // Choose the lighter:
                                if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) < matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matchA);
                                } else {
                                    setSelectedMatch(matchB);
                                }
                            }
                        // We win "matchA":
                        else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) + dice > 13 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) + dice <= 13) {
                                // Choose "matchA":
                                setSelectedMatch(matchA);
                            }
                        // We win "matchB":
                        else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) + dice <= 13 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) + dice > 13) {
                                // Choose "matchB":
                                setSelectedMatch(matchB);
                            }
                        // We win none of the remining matches:
                        else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) + dice <= 13 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) + dice <= 13) {
                                // Choose the closest:
                                if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matchA);
                                } else {
                                    setSelectedMatch(matchB);
                                }
                            }
                    }
                    // We're better in "matchA":
                    else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > 7 &&
                        matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) < 8) {
                            // We win "matchA":
                            if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) + dice > 13) {
                                // user needs 1 or 2 or 3 to win:
                                if (matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) < 4) {
                                    // Choose "matchB":
                                    setSelectedMatch(matchB);
                                } else {
                                    // Choose "matchA":
                                    setSelectedMatch(matchA);
                                }
                            }
                            // We don't win "matchA":
                            else {
                                // Choose "matchA":
                                setSelectedMatch(matchA);
                            }
                        }
                    // We're better in "matchB":
                    else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) < 8 &&
                        matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) > 7) {
                            // We win "matchB":
                            if (matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) + dice > 13) {
                                // user needs 1 or 2 or 3 to win:
                                if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) < 4) {
                                    // Choose "matchA":
                                    setSelectedMatch(matchA);
                                } else {
                                    // Choose "matchB":
                                    setSelectedMatch(matchB);
                                }
                            }
                            // We don't win "matchB":
                            else {
                                // Choose "matchB":
                                setSelectedMatch(matchB);
                            }
                        }
                    // We're neither better in "MatchA" nor in "matchB":
                    else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) < 8 &&
                        matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) < 8) {
                            // Choose the closest:
                            if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matchA);
                            } else {
                                setSelectedMatch(matchB);
                            }
                        }
                    else {
                        setSelectedMatch(availableMatches[Math.floor(Math.random() * availableMatches.length)]);
                    }
                }
                // Main Condition 3:
                else if (userScore === 0 && pejmanScore === 1) {
                    const matchA = availableMatches[0];
                    const matchB = availableMatches[1];
                    // We win both remaining matches:
                    if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) + dice > 13 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) + dice > 13) {
                                // Choose one of them :)
                                setSelectedMatch(matchA);
                            }
                    // We win only "matchA":
                    else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) + dice > 13 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) + dice <= 13) {
                                // Choose "matchA":
                                setSelectedMatch(matchA);
                            }
                    // We win only "matchB":
                    else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) + dice <= 13 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) + dice > 13) {
                                // Choose "matchB":
                                setSelectedMatch(matchB);
                            }
                    // We neither win "matchA" nor "matchB":
                    else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) + dice <= 13 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) + dice <= 13) {
                                // We're better in both "matchA" and "matchB":
                                if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > 7 &&
                                matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) > 7) {
                                    // Choose the closest:
                                    if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2)) {
                                        setSelectedMatch(matchA);
                                    } else {
                                        setSelectedMatch(matchB);
                                    }
                                }
                                // User's better in both "matchA" and "matchB":
                                else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) <= 7 &&
                                matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) <= 7) {
                                    // Choose the closest:
                                    if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2)) {
                                        setSelectedMatch(matchA);
                                    } else {
                                        setSelectedMatch(matchB);
                                    }
                                }
                                // We're better in "matchA":
                                else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > 7 &&
                                matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) <= 7) {
                                    // User needs 1 or 2 or 3 to win:
                                    if (matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) <= 3) {
                                        // Choose "matchB":
                                        setSelectedMatch(matchB);
                                    } else {
                                        // Choose "matchA":
                                        setSelectedMatch(matchA);
                                    }
                                }
                                // We're better in "matchB":
                                else if (matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) > 7 &&
                                matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) <= 7) {
                                    // User needs 1 or 2 or 3 to win:
                                    if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) <= 3) {
                                        // Choose "matchA":
                                        setSelectedMatch(matchA);
                                    } else {
                                        // Choose "matchB":
                                        setSelectedMatch(matchB);
                                    }
                                }
                            }
                    else {
                        setSelectedMatch(availableMatches[Math.floor(Math.random() * availableMatches.length)]);
                    }
                }
                // Main Condition 4:
                else if (userScore === 1 && pejmanScore === 1) {
                    setSelectedMatch(availableMatches[0]);
                }
            }
            // user's color is "Blue":
            else if (userColor === "Red") {
                // Main Condition 1:
                if (userScore === 0 && pejmanScore === 0) {
                    // User is in a beeter situation in all 3 matches:
                    if (matches[0]?.matchValue?.indexOf(V2) >= 7 && matches[1]?.matchValue?.indexOf(V2) >= 7 && matches[2]?.matchValue?.indexOf(V2) >= 7) {
                        if (dice === 4 || dice === 5 || dice === 6) {
                            // Choose user's best:
                            if (matches[0]?.matchValue?.indexOf(V2) >= matches[1]?.matchValue?.indexOf(V2) &&
                                matches[0]?.matchValue?.indexOf(V2) >= matches[2]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[0].matchName);
                                }
                            else if (matches[1]?.matchValue?.indexOf(V2) >= matches[0]?.matchValue?.indexOf(V2) &&
                                matches[1]?.matchValue?.indexOf(V2) >= matches[2]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[1].matchName);
                                }
                            else if (matches[2]?.matchValue?.indexOf(V2) >= matches[0]?.matchValue?.indexOf(V2) &&
                                matches[2]?.matchValue?.indexOf(V2) >= matches[1]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[2].matchName);
                                }
                        } else {
                            // Choose user's worst:
                            if (matches[0]?.matchValue?.indexOf(V2) <= matches[1]?.matchValue?.indexOf(V2) &&
                                matches[0]?.matchValue?.indexOf(V2) <= matches[2]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[0].matchName);
                                }
                            else if (matches[1]?.matchValue?.indexOf(V2) <= matches[0]?.matchValue?.indexOf(V2) &&
                                matches[1]?.matchValue?.indexOf(V2) <= matches[2]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[1].matchName);
                                }
                            else if (matches[2]?.matchValue?.indexOf(V2) <= matches[0]?.matchValue?.indexOf(V2) &&
                                matches[2]?.matchValue?.indexOf(V2) <= matches[1]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[2].matchName);
                                }
                        }
                    }
                    // We are in a beeter situation in all 3 matches:
                    else if (matches[0]?.matchValue?.indexOf(V2) < 7 && matches[1]?.matchValue?.indexOf(V2) < 7 && matches[2]?.matchValue?.indexOf(V2) < 7) {
                        // We can win 1 match:
                        if (matches[0]?.matchValue?.indexOf(V2) - dice < 1 && matches[1]?.matchValue?.indexOf(V2) - dice > 0 && matches[2]?.matchValue?.indexOf(V2) - dice > 0) {
                            // Choose match1:
                            setSelectedMatch(matches[0].matchName);
                        }
                        else if (matches[0]?.matchValue?.indexOf(V2) - dice > 0 && matches[1]?.matchValue?.indexOf(V2) - dice < 1 && matches[2]?.matchValue?.indexOf(V2) - dice > 0) {
                            // Choose match2:
                            setSelectedMatch(matches[1].matchName);
                        }
                        else if (matches[0]?.matchValue?.indexOf(V2) - dice > 0 && matches[1]?.matchValue?.indexOf(V2) - dice > 0 && matches[2]?.matchValue?.indexOf(V2) - dice < 1) {
                            // Choose match3:
                            setSelectedMatch(matches[2].matchName);
                        } 
                        // We can win 2 matches:
                        else if (matches[0]?.matchValue?.indexOf(V2) - dice < 1 && matches[1]?.matchValue?.indexOf(V2) - dice < 1 && matches[2]?.matchValue?.indexOf(V2) - dice > 0) {
                            // Choose the lightest win:
                            if (matches[0]?.matchValue?.indexOf(V2) > matches[1]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                            } else {
                                setSelectedMatch(matches[1].matchName);
                            }
                        }
                        else if (matches[0]?.matchValue?.indexOf(V2) - dice < 1 && matches[1]?.matchValue?.indexOf(V2) - dice > 0 && matches[2]?.matchValue?.indexOf(V2) - dice < 1) {
                            // Choose the lightest win:
                            if (matches[0]?.matchValue?.indexOf(V2) > matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                            } else {
                                setSelectedMatch(matches[2].matchName);
                            }
                        }
                        else if (matches[0]?.matchValue?.indexOf(V2) - dice > 0 && matches[1]?.matchValue?.indexOf(V2) - dice < 1 && matches[2]?.matchValue?.indexOf(V2) - dice < 1) {
                            // Choose the lightest win:
                            if (matches[1]?.matchValue?.indexOf(V2) > matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[1].matchName);
                            } else {
                                setSelectedMatch(matches[2].matchName);
                            }
                        }
                        // We can win 3 matches:
                        else if (matches[0]?.matchValue?.indexOf(V2) - dice < 1 && matches[1]?.matchValue?.indexOf(V2) - dice < 1 && matches[2]?.matchValue?.indexOf(V2) - dice < 1) {
                            // Choose the lightest win:
                            if (matches[0]?.matchValue?.indexOf(V2) >= matches[1]?.matchValue?.indexOf(V2) && matches[0]?.matchValue?.indexOf(V2) >= matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                            } else if (matches[1]?.matchValue?.indexOf(V2) >= matches[0]?.matchValue?.indexOf(V2) && matches[1]?.matchValue?.indexOf(V2) >= matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[1].matchName);
                            } else if (matches[2]?.matchValue?.indexOf(V2) >= matches[0]?.matchValue?.indexOf(V2) && matches[2]?.matchValue?.indexOf(V2) >= matches[1]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[2].matchName);
                            }
                        }
                        // We can't win in any match:
                        else if (matches[0]?.matchValue?.indexOf(V2) - dice > 0 && matches[1]?.matchValue?.indexOf(V2) - dice > 0 && matches[2]?.matchValue?.indexOf(V2) - dice > 0) {
                            // Choose our best option:
                            if (matches[0]?.matchValue?.indexOf(V2) <= matches[1]?.matchValue?.indexOf(V2) && matches[0]?.matchValue?.indexOf(V2) <= matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                            } else if (matches[1]?.matchValue?.indexOf(V2) <= matches[0]?.matchValue?.indexOf(V2) && matches[1]?.matchValue?.indexOf(V2) <= matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[1].matchName);
                            } else if (matches[2]?.matchValue?.indexOf(V2) <= matches[0]?.matchValue?.indexOf(V2) && matches[2]?.matchValue?.indexOf(V2) <= matches[1]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[2].matchName);
                            }
                        }
                    }
                    // We are in a beter situation in 2 matches:
                    // We are better in "match1" and "match2":
                    else if (matches[0]?.matchValue?.indexOf(V2) < 7 && matches[1]?.matchValue?.indexOf(V2) < 7 && matches[2]?.matchValue?.indexOf(V2) > 6) {
                        // We win "match1" and "match2":
                        if (matches[0]?.matchValue?.indexOf(V2) - dice < 1 && matches[1]?.matchValue?.indexOf(V2) - dice < 1) {
                            // Choose the lightest:
                            if (matches[0]?.matchValue?.indexOf(V2) > matches[1]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                            } else {
                                setSelectedMatch(matches[1].matchName);
                            }
                        }
                        // We win "match1":
                        else if (matches[0]?.matchValue?.indexOf(V2) - dice < 1 && matches[1]?.matchValue?.indexOf(V2) - dice > 0) {
                            // Choose "match1":
                            setSelectedMatch(matches[0].matchName);
                        }
                        // We win "match2":
                        else if (matches[0]?.matchValue?.indexOf(V2) - dice > 0 && matches[1]?.matchValue?.indexOf(V2) - dice < 1) {
                            // Choose "match2":
                            setSelectedMatch(matches[1].matchName);
                        }
                        // We neither win "match1" nor "match2":
                        else if (matches[0]?.matchValue?.indexOf(V2) - dice > 0 && matches[1]?.matchValue?.indexOf(V2) - dice > 0) {
                            // The user needs 1 to win match3:
                            if (matches[2]?.matchValue?.indexOf(V2) === 13) {
                                // Choose match3:
                                setSelectedMatch(matches[2].matchName);
                            } else {
                                // Choose the closer between match1 or match2:
                                if (matches[0]?.matchValue?.indexOf(V2) < matches[1]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                                } else {
                                    setSelectedMatch(matches[1].matchName);
                                }
                            }
                        }
                    }
                    // We are better in "match1" and "match3":
                    else if (matches[0]?.matchValue?.indexOf(V2) < 7 && matches[1]?.matchValue?.indexOf(V2) > 6 && matches[2]?.matchValue?.indexOf(V2) < 7) {
                        // We win "match1" and "match3":
                        if (matches[0]?.matchValue?.indexOf(V2) - dice < 1 && matches[2]?.matchValue?.indexOf(V2) - dice < 1) {
                            // Choose the lightest:
                            if (matches[0]?.matchValue?.indexOf(V2) > matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[0].matchName);
                            } else {
                                setSelectedMatch(matches[2].matchName);
                            }
                        }
                        // We win "match1":
                        else if (matches[0]?.matchValue?.indexOf(V2) - dice < 1 && matches[2]?.matchValue?.indexOf(V2) - dice > 0) {
                            // Choose "match1":
                            setSelectedMatch(matches[0].matchName);
                        }
                        // We win "match3":
                        else if (matches[0]?.matchValue?.indexOf(V2) - dice > 0 && matches[2]?.matchValue?.indexOf(V2) - dice < 1) {
                            // Choose "match3":
                            setSelectedMatch(matches[2].matchName);
                        }
                        // We neither win "match1" nor "match3":
                        else if (matches[0]?.matchValue?.indexOf(V2) - dice > 0 && matches[2]?.matchValue?.indexOf(V2) - dice > 0) {
                            // The user needs 1 to win match2
                            if (matches[1]?.matchValue?.indexOf(V2) === 13) {
                                // Choose match2:
                                setSelectedMatch(matches[1].matchName);
                            } else {
                                // Choose the closer between match1 or match3:
                                if (matches[0]?.matchValue?.indexOf(V2) < matches[2]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[0].matchName);
                                } else {
                                    setSelectedMatch(matches[2].matchName);
                                }
                            }
                        }
                    }
                    // We are better in "match2" and "match3":
                    else if (matches[0]?.matchValue?.indexOf(V2) > 6 && matches[1]?.matchValue?.indexOf(V2) < 7 && matches[2]?.matchValue?.indexOf(V2) < 7) {
                        // We win "match2" and "match3":
                        if (matches[1]?.matchValue?.indexOf(V2) - dice < 1 && matches[2]?.matchValue?.indexOf(V2) - dice < 1) {
                            // Choose the lightest:
                            if (matches[1]?.matchValue?.indexOf(V2) > matches[2]?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matches[1].matchName);
                            } else {
                                setSelectedMatch(matches[2].matchName);
                            }
                        }
                        // We win "match2":
                        else if (matches[1]?.matchValue?.indexOf(V2) - dice < 1 && matches[2]?.matchValue?.indexOf(V2) - dice > 0) {
                            // Choose "match2":
                            setSelectedMatch(matches[1].matchName);
                        }
                        // We win "match3":
                        else if (matches[1]?.matchValue?.indexOf(V2) - dice > 0 && matches[2]?.matchValue?.indexOf(V2) - dice < 1) {
                            // Choose "match3":
                            setSelectedMatch(matches[2].matchName);
                        }
                        // We neither win "match2" nor "match3":
                        else if (matches[1]?.matchValue?.indexOf(V2) - dice > 0 && matches[2]?.matchValue?.indexOf(V2) - dice > 0) {
                            // The user needs 1 to win match1
                            if (matches[0]?.matchValue?.indexOf(V2) === 13) {
                                // Choose match1:
                                setSelectedMatch(matches[0].matchName);
                            } else {
                                // Choose the closer between match2 or match3:
                                if (matches[1]?.matchValue?.indexOf(V2) < matches[2]?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matches[1].matchName);
                                } else {
                                    setSelectedMatch(matches[2].matchName);
                                }
                            }
                        }

                    }
                    // We're better in 1 match:
                    // We're better in "match1":
                    else if (matches[0]?.matchValue?.indexOf(V2) < 7 && matches[1]?.matchValue?.indexOf(V2) > 6 && matches[2]?.matchValue?.indexOf(V2) > 6) {
                        // We win "match1":
                        if (matches[0]?.matchValue?.indexOf(V2) - dice < 1) {
                            // Choose "match1":
                            setSelectedMatch(matches[0].matchName);
                        } else if (dice > 3) {
                            // Choose the user's best:
                            if (matches[1]?.matchValue?.indexOf(V2) > matches[2]?.matchValue?.indexOf(V2)) {
                                // Choose "match2":
                                setSelectedMatch(matches[1].matchName);
                            } else {
                                // Choose "match3":
                                setSelectedMatch(matches[2].matchName);
                            }
                        } else {
                            // Choose "match1":
                            setSelectedMatch(matches[0].matchName);
                        }
                    }
                    // We're better in "match2":
                    else if (matches[0]?.matchValue?.indexOf(V2) > 6 && matches[1]?.matchValue?.indexOf(V2) < 7 && matches[2]?.matchValue?.indexOf(V2) > 6) {
                        // We win "match2":
                        if (matches[1]?.matchValue?.indexOf(V2) - dice < 1) {
                            // Choose "match2":
                            setSelectedMatch(matches[1].matchName);
                        } else if (dice > 3) {
                            // Choose the user's best:
                            if (matches[0]?.matchValue?.indexOf(V2) > matches[2]?.matchValue?.indexOf(V2)) {
                                // Choose "match1":
                            setSelectedMatch(matches[0].matchName);
                            } else {
                                // Choose "match3":
                                setSelectedMatch(matches[2].matchName);
                            }
                        } else {
                            // Choose "match2":
                            setSelectedMatch(matches[1].matchName);
                        }
                    }
                    // We're better in "match3":
                    else if (matches[0]?.matchValue?.indexOf(V2) > 6 && matches[1]?.matchValue?.indexOf(V2) > 6 && matches[2]?.matchValue?.indexOf(V2) < 7) {
                        // We win "match3":
                        if (matches[2]?.matchValue?.indexOf(V2) - dice < 1) {
                            // Choose "match3":
                            setSelectedMatch(matches[2].matchName);
                        } else if (dice > 3) {
                            // Choose the user's best:
                            if (matches[0]?.matchValue?.indexOf(V2) > matches[1]?.matchValue?.indexOf(V2)) {
                                // Choose "match1":
                            setSelectedMatch(matches[0].matchName);
                            } else {
                                // Choose "match2":
                                setSelectedMatch(matches[1].matchName);
                            }
                        } else {
                            // Choose "match3":
                            setSelectedMatch(matches[2].matchName);
                        }
                    }
                    else {
                        setSelectedMatch(availableMatches[Math.floor(Math.random() * availableMatches.length)]);
                    }
                }
                // Main Condition 2:
                else if (userScore === 1 && pejmanScore === 0) {
                    const matchA = availableMatches[0];
                    const matchB = availableMatches[1];
                    // We're better in both remaining matches:
                    if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) < 7 &&
                        matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) < 7) {
                        // We win both remaining matches:
                        if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) - dice < 1 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) - dice < 1) {
                                // Choose the lighter:
                                if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matchA);
                                } else {
                                    setSelectedMatch(matchB);
                                }
                            }
                        // We win "matchA":
                        else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) - dice < 1 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) - dice > 0) {
                                // Choose "matchA":
                                setSelectedMatch(matchA);
                            }
                        // We win "matchB":
                        else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) - dice > 0 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) - dice < 1) {
                                // Choose "matchB":
                                setSelectedMatch(matchB);
                            }
                        // We win none of the remining matches:
                        else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) - dice > 0 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) - dice > 0) {
                                // Choose the closest:
                                if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) < matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2)) {
                                    setSelectedMatch(matchA);
                                } else {
                                    setSelectedMatch(matchB);
                                }
                            }
                    }
                    // We're better in "matchA":
                    else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) < 7 &&
                        matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) > 6) {
                            // We win "matchA":
                            if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) - dice < 1) {
                                // user needs 1 or 2 or 3 to win:
                                if (matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) > 10) {
                                    // Choose "matchB":
                                    setSelectedMatch(matchB);
                                } else {
                                    // Choose "matchA":
                                    setSelectedMatch(matchA);
                                }
                            }
                            // We don't win "matchA":
                            else {
                                // Choose "matchA":
                                setSelectedMatch(matchA);
                            }
                        }
                    // We're better in "matchB":
                    else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > 6 &&
                        matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) < 7) {
                            // We win "matchB":
                            if (matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) - dice < 1) {
                                // user needs 1 or 2 or 3 to win:
                                if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > 10) {
                                    // Choose "matchA":
                                    setSelectedMatch(matchA);
                                } else {
                                    // Choose "matchB":
                                    setSelectedMatch(matchB);
                                }
                            }
                            // We don't win "matchB":
                            else {
                                // Choose "matchB":
                                setSelectedMatch(matchB);
                            }
                        }
                    // We're neither better in "MatchA" nor in "matchB":
                    else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > 6 &&
                        matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) > 6) {
                            // Choose the closest:
                            if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) < matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2)) {
                                setSelectedMatch(matchA);
                            } else {
                                setSelectedMatch(matchB);
                            }
                        }
                    else {
                        setSelectedMatch(availableMatches[Math.floor(Math.random() * availableMatches.length)]);
                    }
                }
                // Main Condition 3:
                else if (userScore === 0 && pejmanScore === 1) {
                    const matchA = availableMatches[0];
                    const matchB = availableMatches[1];
                    // We win both remaining matches:
                    if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) - dice < 1 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) - dice < 1) {
                                // Choose one of them :)
                                setSelectedMatch(matchA);
                            }
                    // We win only "matchA":
                    else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) - dice < 1 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) - dice > 0) {
                                // Choose "matchA":
                                setSelectedMatch(matchA);
                            }
                    // We win only "matchB":
                    else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) - dice > 0 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) - dice < 1) {
                                // Choose "matchB":
                                setSelectedMatch(matchB);
                            }
                    // We neither win "matchA" nor "matchB":
                    else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) - dice > 0 &&
                            matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) - dice > 0) {
                                // We're better in both "matchA" and "matchB":
                                if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) < 7 &&
                                matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) < 7) {
                                    // Choose the closest:
                                    if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) < matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2)) {
                                        setSelectedMatch(matchA);
                                    } else {
                                        setSelectedMatch(matchB);
                                    }
                                }
                                // User's better in both "matchA" and "matchB":
                                else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > 6 &&
                                matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) > 6) {
                                    // Choose the closest:
                                    if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) < matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2)) {
                                        setSelectedMatch(matchA);
                                    } else {
                                        setSelectedMatch(matchB);
                                    }
                                }
                                // We're better in "matchA":
                                else if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) < 7 &&
                                matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) > 6) {
                                    // User needs 1 or 2 or 3 to win:
                                    if (matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) > 10) {
                                        // Choose "matchB":
                                        setSelectedMatch(matchB);
                                    } else {
                                        // Choose "matchA":
                                        setSelectedMatch(matchA);
                                    }
                                }
                                // We're better in "matchB":
                                else if (matches.find(m => m.matchName === matchB)?.matchValue?.indexOf(V2) < 7 &&
                                matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > 6) {
                                    // User needs 1 or 2 or 3 to win:
                                    if (matches.find(m => m.matchName === matchA)?.matchValue?.indexOf(V2) > 10) {
                                        // Choose "matchA":
                                        setSelectedMatch(matchA);
                                    } else {
                                        // Choose "matchB":
                                        setSelectedMatch(matchB);
                                    }
                                }
                            }
                    else {
                        setSelectedMatch(availableMatches[Math.floor(Math.random() * availableMatches.length)]);
                    }
                }
                // Main Condition 4:
                else if (userScore === 1 && pejmanScore === 1) {
                    setSelectedMatch(availableMatches[0]);
                }
            }
        setMatches((currMatches) => currMatches.map((m) =>
        m.matchName === selectedMatch ? {...m, isMatchSelected: true} : m
    ))
    }
  setMatches((currMatches) => currMatches.map((m) =>
        m.matchName === selectedMatch ? {...m, isMatchSelected: true} : m
    ))
  }, [dice]);
  useEffect(() => {
    if (userScore === 2) {
        setFinalMessage("You Win!");
        if (normalMode) {
            updateTotalPoint(1);
        }
    }
  }, [userScore]);
  useEffect(() => {
    if (pejmanScore === 2) {
        setFinalMessage("Pejman Wins!");
    }
  }, [pejmanScore]);
  return (
    <div>
      <h2>Tug of War</h2>
      <div style={{color: "red"}}>Dice: {dice}</div>
      {!isGameStarted && !easyMode && !normalMode && !isTogglingHomePage &&
        <div>
            <button onClick={handleEasyMode}>Easy Mode</button>
            <button onClick={handleNormalMode}>Normal Mode</button>
        </div>
      }
      {isGameStarted &&
          !isTogglingReset &&
          finalMessage === "" &&
          !isTogglingHomePage &&
          !isTogglingLevel &&
          (easyMode || normalMode) && (
          <div>
              <button onClick={toggleReset}  disabled={dice === 0}>Reset the Game</button>
          </div>
          )}
      {isTogglingReset && finalMessage === "" && (
          <div>
            <ConfirmationBox
                question="Are you sure you want to reset the game?"
                toggleYes={toggleResetYes}
                toggleCancel={toggleResetCancel}
            />
          </div>
      )}
            {(easyMode || normalMode) &&
              !isTogglingReset &&
              !isTogglingHomePage &&
              !isTogglingLevel &&
              finalMessage === "" && (
                <div>
                  <button
                    style={{
                      display: "inline",
                    }}
                    onClick={() => toggleLevel()}
                     disabled={dice === 0}
                  >{`Switch to ${easyMode ? "Normal Mode" : "Easy Mode"}`}</button>
                </div>
              )}
            {isTogglingLevel && finalMessage === "" && (
              <div>
                <ConfirmationBox
                  question={`Are you sure you want to switch to ${
                    easyMode ? "Normal Mode" : "Easy Mode"
                  }?`}
                  toggleYes={toggleLevelYes}
                  toggleCancel={toggleLevelCancel}
                  easyMode={easyMode}
                />
              </div>
            )}
                  {!isTogglingHomePage &&
                    !isTogglingReset &&
                    !isTogglingLevel &&
                    finalMessage === "" && (
                      <div>
                        <button onClick={() => toggleHomePage()} disabled={dice === 0}>
                          Back to the home page
                        </button>
                      </div>
                    )}
                  {isTogglingHomePage && finalMessage === "" && (
                    <div>
                      <ConfirmationBox
                        question="Are you sure you want to go back to Home Page?"
                        toggleYes={toggleHomePageYes}
                        toggleCancel={toggleHomePageCancel}
                      />
                    </div>
                  )}
      {finalMessage && finalMessage === "You Win!" && !isTogglingHomePage &&
        <div>
            <h3>You Win!</h3>
            <div>Play Again?</div>
            <button onClick={handlePlayAgain}>Ok</button>
        </div>
      }
      {finalMessage && finalMessage === "Pejman Wins!" && !isTogglingHomePage &&
        <div>
            <h3>Pejman Wins!</h3>
            <div>Try Again?</div>
            <button onClick={handlePlayAgain}>Ok</button>
        </div>
      }
      {easyMode && !normalMode && finalMessage === ""
              ? 
                !isTogglingReset &&
                !isTogglingHomePage &&
                !isTogglingLevel &&
                (
                  <ModeExplaination message="Easy Mode: Pejman chooses the match randomly. You won't get any stars if you win." />
                )
              : !easyMode && normalMode && finalMessage === "" &&
                !isTogglingReset &&
                !isTogglingHomePage &&
                !isTogglingLevel &&
                (
                  <ModeExplaination message="Normal Mode: Pejman chooses the match with a strategy. You will get one star if you win." />
                )}
      {/* <div>Selected Match: {selectedMatch}</div>
      finished Matches: {finishedMatches.map(m => <div style={{display: "inline"}}>{m}</div>)}<br />
      Available Matches: {availableMatches.map(m => <div style={{display: "inline"}}>{m}</div>)}<br />
      Selected Status: {matches.map((m) => <div style={{display: "inline"}}>{m.isMatchSelected ? "T" : "F"}</div>)} */}
      {isGameStarted && userColor === "Blue" && !isTogglingReset && !isTogglingLevel && !isTogglingHomePage &&
        <div>
            <div style={{color: "blue", display: "inline"}}><strong>{`Your Point: ${userScore}`}</strong></div>
            <div style={{color: "red", display: "inline"}}><strong>{`Pejman's Point: ${pejmanScore}`}</strong></div>
        </div>
      }
      {isGameStarted && userColor === "Red" && !isTogglingReset && !isTogglingLevel && !isTogglingHomePage &&
        <div>
            <div style={{color: "blue", display: "inline"}}><strong>{`Pejman's Point: ${pejmanScore}`}</strong></div>
            <div style={{color: "red", display: "inline"}}><strong>{`Your Point: ${userScore}`}</strong></div>
        </div>
      }
      {isGameStarted && !isTogglingReset && !isTogglingLevel && !isTogglingHomePage && (
        <div>
            <Match
                theMatch={matches[0]}
                matchName={matches[0].matchName}
                userColor={userColor}
                isUserTurn={isUserTurn}
                isDiceUpdated={isDiceUpdated}
                dice={dice}
                setMatches={setMatches}
                selectedMatch={selectedMatch}
                setSelectedMatch={setSelectedMatch}
                finishedMatches={finishedMatches}
                availableMatches={availableMatches}
                finalMessage={finalMessage}
            />
            <Match
                theMatch={matches[1]}
                matchName={matches[1].matchName}
                userColor={userColor}
                isUserTurn={isUserTurn}
                isDiceUpdated={isDiceUpdated}
                dice={dice}
                setMatches={setMatches}
                selectedMatch={selectedMatch}
                setSelectedMatch={setSelectedMatch}
                finishedMatches={finishedMatches}
                availableMatches={availableMatches}
                finalMessage={finalMessage}
            />
            <Match
                theMatch={matches[2]}
                matchName={matches[2].matchName}
                userColor={userColor}
                isUserTurn={isUserTurn}
                isDiceUpdated={isDiceUpdated}
                dice={dice}
                setMatches={setMatches}
                selectedMatch={selectedMatch}
                setSelectedMatch={setSelectedMatch}
                finishedMatches={finishedMatches}
                availableMatches={availableMatches}
                finalMessage={finalMessage}
            />
        </div>
      )}
      {!isGameStarted && (easyMode || normalMode) && !isTogglingReset && !isTogglingLevel && !isTogglingHomePage && (
        <div>
          <label htmlFor="userColor">Select a Color</label>
          <br></br>
          <select onChange={handleUserColor} name="userColor" id="userColor">
            <option value={userColor} disabled selected>
              🔽🔽🔽
            </option>
            {["Red", "Blue"].map((c) => (
              <option>{c}</option>
            ))}
          </select>
        </div>
      )}
      {!isGameStarted && (easyMode || normalMode) && userColor !== "" && !isTogglingReset && !isTogglingLevel && !isTogglingHomePage && (
        <button onClick={handleStart}>Start</button>
      )}
      {isGameStarted && isUserTurn && !isDiceUpdated && finalMessage === "" && !isTogglingReset && !isTogglingLevel && !isTogglingHomePage &&
        <button style={{position: "relative", top: "15px"}} onClick={rollDice}>Roll the Dice</button>
      }
      {isGameStarted && !isUserTurn && !isDiceUpdated && finalMessage === "" && !isTogglingReset && !isTogglingLevel && !isTogglingHomePage &&
        <div style={{position: "relative", top: "15px"}}>
            <div>Allow Pejman to roll the dice</div>
            <button onClick={rollDice}>Ok</button>
        </div>
      }
      {isGameStarted && isDiceUpdated && !isTogglingReset && !isTogglingLevel && !isTogglingHomePage && (
          <div style={{position: "relative", top: "20px"}}>
            {dice === 0 && <div>Rolling the Dice ...</div>}
            {dice === 1 && <img src={Dice1} width="50px" />}
            {dice === 2 && <img src={Dice2} width="50px" />}
            {dice === 3 && <img src={Dice3} width="50px" />}
            {dice === 4 && <img src={Dice4} width="50px" />}
            {dice === 5 && <img src={Dice5} width="50px" />}
            {dice === 6 && <img src={Dice6} width="50px" />}
          </div>
      )}
      {isGameStarted && isUserTurn && isDiceUpdated && dice > 0 && finalMessage === "" && selectedMatch === "" && !isTogglingReset && !isTogglingLevel && !isTogglingHomePage &&
        <div style={{position: "relative", top: "20px"}}>Choose a match</div>
      }
      {isGameStarted && isUserTurn && isDiceUpdated && dice > 0 && finalMessage === "" && selectedMatch !== "" && !isTogglingReset && !isTogglingLevel && !isTogglingHomePage &&
        <button onClick={userAct} style={{position: "relative", top: "20px"}}>Act</button>
      }
      {isGameStarted && !isUserTurn && isDiceUpdated && dice > 0 && finalMessage === "" && !isTogglingReset && !isTogglingLevel && !isTogglingHomePage &&
        <div style={{position: "relative", top: "20px"}}>
            <div>Allow Pejman to make his move</div>
            <button onClick={pejmanAct} style={{position: "relative", top: "5px"}}>Ok</button>
        </div>
      }
      {isGameStarted && <ReviewSection game="TugOfWar" />}
    </div>
  );
}
