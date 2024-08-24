class Processor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];
    if (input) {
      const channelData = input[0];
      let sum = 0;
      for (let i = 0; i < channelData.length; i++) {
        sum += Math.abs(channelData[i]);
      }
      const average = sum / channelData.length;
      this.port.postMessage({ isSpeaking: average > 0.05 });
    }
    return true;
  }
}

registerProcessor("processor", Processor);
