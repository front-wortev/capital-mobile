import React from 'react';
import { View } from 'react-native';
import { Texts } from '../atoms/Texts';
import { reusableStyles } from '../reusableStyles';

export const StepIndicator = ({ currentStep, steps }) => {

    const totalSteps = 5;

  const renderSteps = () => {
    let steps = [];
    for (let i = 1; i <= totalSteps; i++) {
      steps.push(
        <View key={i} style={reusableStyles.stepContainer}>
          <View style={[
            reusableStyles.circleStep,
            i <= currentStep && reusableStyles.filledCircle,
            (i <= currentStep || i === currentStep + 1) && reusableStyles.activeBorder,
            i > currentStep + 1 && reusableStyles.inactiveBorder,
          ]}>
          </View>
          {i !== totalSteps && <View style={[reusableStyles.line, i < currentStep && reusableStyles.filledLine]} />}
        </View>
      );
    }
    return steps;
  };

  return (
    <View style={{flexDirection: 'row', paddingVertical: 20}} >
        <View style={reusableStyles.containerSteps}>{renderSteps()}</View>
        <View >
            {steps.map((step, index) => (
                <View key={index} style={{flexDirection: index === 4 ? 'column' : 'row', alignItems: 'baseline'}}>
                    <Texts type='h3' >{step.bold}</Texts>
                    <Texts type='p' extraStyles={{marginBottom: 29 - index}} >{step.description}</Texts>
                    <Texts type='h3' >{step.bold2} </Texts>
                </View>
            ))}

        </View>
    </View>
  )};