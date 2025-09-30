import { ReactTerminal } from "react-terminal";

export default function Terminal() {
    const commands = {
        commands: "-test: to confirm that it's working",
        test: "This is a test",
    };

    return (
        <ReactTerminal
            commands={commands}
        />
    );
}