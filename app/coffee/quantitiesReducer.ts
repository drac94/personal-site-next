type QuantitiesState = {
  cups: number;
  coffee: number;
  water: number;
};

type QuantitiesAction =
  | { type: 'increaseCups'; payload: number }
  | { type: 'increaseCoffee'; payload: number }
  | { type: 'increaseWater'; payload: number };

export const actions: {
  [key: string]: 'increaseCups' | 'increaseCoffee' | 'increaseWater';
} = {
  cups: 'increaseCups',
  coffee: 'increaseCoffee',
  water: 'increaseWater',
};

export const initialQuantities = {
  cups: 1,
  coffee: 16,
  water: 236,
};

export const quantitiesReducer = (
  state: QuantitiesState,
  action: QuantitiesAction
) => {
  const { type, payload } = action;
  switch (type) {
    case actions.cups:
      return {
        cups: payload,
        coffee: Math.round(payload * initialQuantities.coffee),
        water: Math.round(payload * initialQuantities.water),
      };
    case actions.coffee:
      return {
        cups: Math.round(payload / initialQuantities.coffee),
        coffee: payload,
        water: Math.round(
          (payload * initialQuantities.water) / initialQuantities.coffee
        ),
      };
    case actions.water:
      return {
        cups: Math.round(
          (payload * initialQuantities.cups) / initialQuantities.water
        ),
        coffee: Math.round(
          (payload * initialQuantities.coffee) / initialQuantities.water
        ),
        water: payload,
      };
    default:
      return state;
  }
};
