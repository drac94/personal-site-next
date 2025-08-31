"use client";

import * as React from "react";

import { SegmentedPicker } from "@/components/ui/segmented-picker";
import { Slider } from "@/components/ui/slider";

import {
  concentrationOptions,
  flavorOptions,
  roastOptions,
  temperatures,
} from "./constants";
import {
  actions as quantitiesReducerActions,
  initialQuantities,
  quantitiesReducer,
} from "./quantitiesReducer";
import { calculatePourGridColumns, calculatePours } from "./utils";
import Link from "next/link";

const FourSix = (): JSX.Element => {
  const [quantities, dispatch] = React.useReducer(
    quantitiesReducer,
    initialQuantities
  );

  // TODO type this better
  const [roast, setRoast] = React.useState("light");
  const [preferences, setPreferences] = React.useState({
    flavor: "standard",
    concentration: "medium",
  });

  const handleQuantitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: quantitiesReducerActions[e.currentTarget.name],
      payload: Number(e.currentTarget.value),
    });
  };

  const handlePreferencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    setPreferences((prev) => ({
      ...prev,
      [currentTarget.name]: currentTarget.value,
    }));
  };

  const handleRoastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoast(e.currentTarget.value);
  };

  const pours = calculatePours({
    water: quantities.water,
    flavor: preferences.flavor,
    concentration: preferences.concentration,
  });

  const pourGridColumns = calculatePourGridColumns(pours, quantities.water);

  return (
    <div className="mx-auto max-w-[600px] p-4">
      <Link
        href="/"
        className="text-sm text-blue-600 hover:underline"
      >{`< Home`}</Link>

      <h1 className="mb-6 text-2xl">4:6 Calculator</h1>

      {/* Quantities */}
      <div className="mb-8">
        <h2 className="text-xs uppercase text-[rgba(60,60,67,0.6)]">
          Quantities
        </h2>

        <div className="mb-4 border-b border-gray-200 py-4">
          <Slider
            min="1"
            max="10"
            id="cupsRange"
            title="Cups"
            name="cups"
            value={quantities.cups}
            onChange={handleQuantitiesChange}
          />
        </div>

        <div className="mb-4 border-b border-gray-200 py-4">
          <Slider
            min="16"
            max="160"
            id="coffeeRange"
            title="Coffee"
            unit="gr"
            name="coffee"
            value={quantities.coffee}
            onChange={handleQuantitiesChange}
          />
        </div>

        <div className="mb-4 border-b border-gray-200 py-4">
          <Slider
            min="236"
            max="2360"
            id="waterRange"
            title="Water"
            name="water"
            value={quantities.water}
            unit="gr"
            onChange={handleQuantitiesChange}
          />
        </div>
      </div>

      {/* Preferences */}
      <div className="mb-8">
        <h2 className="text-xs uppercase text-[rgba(60,60,67,0.6)]">
          Preferences
        </h2>

        <SegmentedPicker
          selectedValue={preferences.flavor}
          name="flavor"
          title="Flavor"
          options={flavorOptions}
          onChange={handlePreferencesChange}
        />

        <SegmentedPicker
          name="concentration"
          title="Concentration"
          options={concentrationOptions}
          selectedValue={preferences.concentration}
          onChange={handlePreferencesChange}
        />

        <SegmentedPicker
          selectedValue={roast}
          name="roast"
          title="Roast"
          options={roastOptions}
          onChange={handleRoastChange}
        />

        <span className="text-[11px]">
          Recommended temperature for the water: around {temperatures[roast]}ºC
        </span>
      </div>

      {/* Pours */}
      <div className="mb-8">
        <h2 className="text-xs uppercase text-[rgba(60,60,67,0.6)]">Pours</h2>

        <div
          className="grid gap-px"
          style={{ gridTemplateColumns: pourGridColumns }}
        >
          {pours.flavor.map((p, i) => (
            <span
              className="flex h-12 items-center justify-center bg-[#007aff] text-[17px] text-white"
              key={`flavorPour${i}`}
            >
              {Math.round(p)}gr
            </span>
          ))}
          {pours.concentration.map((p, i) => (
            <span
              className="flex h-12 items-center justify-center bg-[#007aff] text-[17px] text-white"
              key={`concentrationPour${i}`}
            >
              {Math.round(p)}gr
            </span>
          ))}
        </div>

        <span className="text-[11px]">
          Each pour should be timed so that the hot water has almost completely
          passed through the filter before pouring again. 1ml = 1gr
        </span>
      </div>

      {/* Info */}
      <div className="mb-8">
        <h2 className="text-xs uppercase text-[rgba(60,60,67,0.6)]">
          What is the 4:6 method?
        </h2>
        {/*<YoutubeEmbed embedId="wmCW8xSWGZY" />*/}
      </div>
    </div>
  );
};

export default FourSix;
