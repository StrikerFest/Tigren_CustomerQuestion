/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright  Copyright (c)  2023.  Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

import React, { createContext, useState } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    const [questionData, setQuestionData] = useState(null);

    return (
        <QuestionContext.Provider value={{ questionData, setQuestionData }}>
            {children}
        </QuestionContext.Provider>
    );
};
