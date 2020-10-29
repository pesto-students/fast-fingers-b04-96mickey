import React from 'react';
import './word.css';

export const Word = React.memo((props) => {
    return (
        <div className="word-to-match">
            {renderMainWord(props.sampleWord, props.answer, props.onSuccessfulAnswer)}
        </div>
    );
});

const renderMainWord = (sampleWord, answer, onSuccessfulAnswer) => {
    let errorCount = 0;
    const htmlToRender = sampleWord.split('').map((alphabet, i) => {
        if (answer && answer[i] && alphabet.toLowerCase() === answer[i].toLowerCase()) {
            return <span key={i} className="match-word">{sampleWord[i].toUpperCase()}</span>;
        } else if(answer && answer[i] && alphabet.toLowerCase() !== answer[i].toLowerCase()) {
            errorCount++;
            return <span key={i} className="wrong-word">{sampleWord[i].toUpperCase()}</span>;
        } else {
            errorCount++;
            return <span key={i} className="sample-word">{sampleWord[i].toUpperCase()}</span>;
        }
    });
    
    !errorCount && onSuccessfulAnswer();
    return htmlToRender;
}
