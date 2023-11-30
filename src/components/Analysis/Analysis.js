import React, { useCallback, useEffect, useState } from "react";

function Analysis(props) {
    const [analysisFeature, setAnalysisFeature] = useState("");
    const { searchResults, getTrackFeatures } = props;

    const handleAnalysisSelection = useCallback((event) => {
        props.getFeature(event.target.value);
        setAnalysisFeature(event.target.value);
    }, [analysisFeature]);

    useEffect(() => {
        if (!searchResults || !analysisFeature) {
            console.log("No search results.");
            return;
        }
        console.log("search results have changed");
        let trackIds = [];
        for (let i=0; i < searchResults.length; i++) {
            trackIds.push(searchResults[i].id);
        }
        console.log(trackIds.join(","));
        getTrackFeatures(trackIds.join(","));
    }, [searchResults]);

    const renderDescription = () => {
        if (analysisFeature === "energy") {
            return <p>Energy is a measure from 0 to 100 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.</p>
        } else if (analysisFeature === "danceability") {
            return <p>Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.</p>
        } else if (analysisFeature === "loudness") {
            return <p>The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db (0 being the loudest).</p>
        } else if (analysisFeature === "tempo") {
            return <p>The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.</p>
        } else if (analysisFeature === "valence") {
            return <p>A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).</p>
        } else {
            return <p>Get audio features for multiple tracks.</p>
        }
    }

    return (
        <div className="Results-header">
                <form>
                    <label for="track-analysis">Track Analysis Ratings:</label>
                    <select id="track-analysis" name="track-analysis" onChange={handleAnalysisSelection}>
                        <option>Select</option>
                        <option value="energy">Energy</option>
                        <option value="danceability">Danceability</option>
                        <option value="loudness">Loudness</option>
                        <option value="tempo">Tempo</option>
                        <option value="valence">Valence</option>
                    </select>
                </form>
                {renderDescription()}
            </div>
    )
}

export default Analysis;