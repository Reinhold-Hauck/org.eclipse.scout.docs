/*
 * Copyright (c) 2017 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Distribution License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/org/documents/edl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 */
import {Form, models} from '@eclipse-scout/core';
import ListBoxFormModel from './ListBoxFormModel';

export default class ListBoxForm extends Form {

  constructor() {
    super();
  }


  _jsonModel() {
    return models.get(ListBoxFormModel);
  }

  _init(model) {
    super._init(model);

    this.listBox = this.widget('ListBox');

    this.lookupCallField = this.widget('LookupCallField');
    this.lookupCallField.setValue(this.listBox.lookupCall);
    this.lookupCallField.on('propertyChange', this._onLookupCallFielChange.bind(this));
    this.listBox.on('propertyChange', this._onListBoxChange.bind(this));

    this.widget('ValueFieldPropertiesBox').setField(this.listBox);
    this.widget('FormFieldPropertiesBox').setField(this.listBox);
    this.widget('PropertiesBox').setTable(this.listBox.table);
    this.widget('GridDataBox').setField(this.listBox);
    this.widget('WidgetActionsBox').setField(this.listBox);
    this.widget('EventsTab').setField(this.listBox);
  }

  _onListBoxChange(event) {
    if (event.propertyName === 'lookupCall') {
      this.lookupCallField.setValue(event.newValue);
    }
  }

  _onLookupCallFielChange(event) {
    if (event.propertyName === 'value') {
      this.listBox.setLookupCall(event.newValue);
    }
  }
}
