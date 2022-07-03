import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

export default function MakeOneQuiz({ order, question, presetOptions, presetRadio, loadData }) {
    const [questionValue, setquestionValue] = useState(question);
    const [optionList, setoptionList] = useState(presetOptions);
    const [selectedRadio, setselectedRadio] = useState(presetRadio);

    loadData(order - 1, { question: questionValue, options: optionList, selected: selectedRadio });

    // Add quiz problem
    const AddOption = () => {
        if (optionList.length > 4) return;
        let options = [...optionList];
        options.unshift('');
        setselectedRadio(0);
        console.log(selectedRadio)
        setoptionList(options);
    };

    // Delete quiz problem
    const DeleteOption = (event) => {
        let options = [...optionList];
        if (options.length > 2) options = options.filter((e, idx) => idx != event);
        setselectedRadio(0);
        console.log(selectedRadio)
        setoptionList(options);
    }

    // Change quiz question
    const ChangeQuestion = (event) => {
        setquestionValue(event.target.value);
    }

    // Change quiz option
    const ChangeOptionContents = (event) => {
        let idx = event.target.id.slice(-1);
        let options = [...optionList];
        options[idx] = event.target.value;
        setoptionList(options);
    }

    // Change quiz radio value
    const handleRadioChange = (event) => {
        setselectedRadio(event);
        console.log(selectedRadio)
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            className={
                order % 4 == 0 ? 'themeYellow' : (order % 4 == 1 ? 'themeRed' : (order % 4 == 2 ? 'themeBlue' : 'themeBlack'))
            }
        >
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    mt: '2em'
                }}
            >
                <h5
                    className='quizIdx'
                >
                    {order < 10 ? '0' + order : order}
                </h5>
                <textarea
                    onChange={ChangeQuestion}
                    value={questionValue}
                    label={"Question" + order}
                    className='quizQuestion'
                />
            </Box >
            <div className='optionBox'>
                <button
                    onClick={AddOption}
                    fullWidth
                    className={'plus optionAdd' + (optionList.length > 3 ? ' invisible' : '')}
                ></button>
                {optionList.map((value, idx) => (
                    <Stack key={idx} direction="row" spacing={0}>
                        <div
                            className={'qOption ' + (selectedRadio == idx ? 'selectedOpt' : '')}
                        >
                            <input
                                id={"opt" + idx}
                                placeholder="Write option"
                                onChange={ChangeOptionContents}
                                onClick={() => handleRadioChange(idx)}
                                value={value}
                                className="optionInput"
                            ></input>
                            <div
                                onClick={() => DeleteOption(idx)}
                                className='optionDelete plus'
                            ></div>
                        </div>
                    </Stack>
                ))}
                <div>
                    <div className='qOption' style={{ height: '0' }}></div>
                </div>
            </div>
        </Container>
    );
}