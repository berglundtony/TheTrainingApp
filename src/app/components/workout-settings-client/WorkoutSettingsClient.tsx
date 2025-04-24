"use client";

import SupersetPending from "../superset-pending/SupersetPending";
import WeightForm from "../weight-form/WeightForm";
import SetAndRepDropDown from "../set-and-rep-dropdown/SetAndRepDropDown";
import styles from "./WorkoutSettingsClient.module.css";


export default function WorkoutSettingsClient({
    values,
    onChange,
}: {
    values: {
        superset: boolean; 
        weight: number;
        set: number;
        rep: number;
        rest: number;
        setvalue: number;
    };
    onChange: (val: typeof values) => void;
    }) {


    const handleFieldChange = (field: keyof typeof values, value: number | string) => {
        onChange({
            ...values,
            [field]: Number(value),
        });
    };

    return (
        <div className={styles.inputBoxesWrapper}>
            <section className={styles.supersetWeightArea}>
            <SupersetPending
                superset={values.superset}
                onChange={(val) => onChange({ ...values, superset: val })} 
            />
            <WeightForm
                weight={values.weight}
                onChange={(value) => handleFieldChange("weight", value)}
                />
            </section>
            <section className={styles.setRepRestArea}>
            <SetAndRepDropDown
                selectedSet={values.set}
                selectedRep={values.rep}
                selectedRest={values.rest}
                onChangeSet={(val) => handleFieldChange("set", val)}
                onChangeRep={(val) => handleFieldChange("rep", val)}
                onChangeRest={(val) => handleFieldChange("rest", val)}
                />
            </section>
        </div>
    );
}





