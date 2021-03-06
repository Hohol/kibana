/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

// @ts-ignore (elastic/eui#1262) EuiSuperSelect is not exported yet
import { EuiSuperSelect } from '@elastic/eui';
import PropTypes from 'prop-types';
import React, { SFC } from 'react';
import { fonts, FontValue } from '../../../common/lib/fonts';

interface Props {
  onSelect?: (value: FontValue) => void;
  value?: FontValue;
}

export const FontPicker: SFC<Props> = props => {
  const { value, onSelect } = props;

  // While fonts are strongly-typed, we also support custom fonts someone might type in.
  // So let's cast the fonts and allow for additions.
  const displayedFonts: Array<{ value: string; label: string }> = fonts;

  if (value && !fonts.find(font => font.value === value)) {
    const label = (value.indexOf(',') >= 0 ? value.split(',')[0] : value).replace(/['"]/g, '');
    displayedFonts.push({ value, label });
    displayedFonts.sort((a, b) => a.label.localeCompare(b.label));
  }

  return (
    <EuiSuperSelect
      compressed
      options={displayedFonts.map(font => ({
        value: font.value,
        inputDisplay: <div style={{ fontFamily: font.value }}>{font.label}</div>,
      }))}
      valueOfSelected={value}
      onChange={(newValue: FontValue) => onSelect && onSelect(newValue)}
    />
  );
};

FontPicker.propTypes = {
  /** Initial value of the Font Picker. */
  value: PropTypes.string,
  /** Function to execute when a Font is selected. */
  onSelect: PropTypes.func,
};

FontPicker.displayName = 'FontPicker';
