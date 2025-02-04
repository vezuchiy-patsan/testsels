import React from 'react';

type inputType = 'text';

interface Param {
  id: number;
  name: string;
  type: inputType;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  values: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      values: props.model.paramValues,
    };
  }

  handleChangeParam = (paramId: number, value: string) => {
    const updatedValues = this.state.values.map((val) =>
      val.paramId === paramId ? { ...val, value } : val
    );
    this.setState({ values: updatedValues });
  };

  getModel(): Model {
    return { paramValues: this.state.values };
  }

  render() {
    return (
      <div>
        <h2>Редактор параметров</h2>
        {this.props.params.map((param) => (
          <div
            key={`param-${param.id}`}
            style={{ display: 'flex', flexDirection: 'column', paddingBlockStart: '10px' }}
          >
            <label htmlFor={`${param.id}`}>{param.name}</label>
            <input
              id={`${param.id}`}
              type={param.type}
              value={this.state.values.find((el) => el.paramId === param.id)?.value ?? ''}
              onChange={(e) => this.handleChangeParam(param.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }
}

const App = () => {
  const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'text' },
    { id: 2, name: 'Длина', type: 'text' },
  ];

  const initialModel: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
  };

  const editorRef = React.createRef<ParamEditor>();

  const getModel = () => {
    if (editorRef.current) {
      const { paramValues } = editorRef.current.getModel();
      alert(paramValues.map((el) => `\n${el.paramId}: ${el.value}`).join(''));
    }
  };

  return (
    <div style={{ padding: '10px', border: '1px solid black', margin: '0 auto', width: 'max-content' }}>
      <ParamEditor ref={editorRef} params={params} model={initialModel} />
      <button onClick={getModel} style={{ marginBlockStart: '10px', width: '100%' }}>
        Получить список
      </button>
    </div>
  );
};

export default App;
