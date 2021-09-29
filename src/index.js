import { assign } from "xstate";
import { util } from "state-machine-snacks";
import encode from "src/utils/encode.js";
import decode from "src/utils/decode.js";
import { hash, updateUrl } from "src/utils/url.js";

const {
    configEditor,
} = util;

export default () => ({
    config : (config) => {
        let result = { ...config };

        // Add an update event used to update context.
        result = configEditor.addEventListener(result, {
            "plugin:url-context:DECODE" : {
                actions : [
                    assign({ decoded : () => decode(hash)  }),
                ],
            },
        });

        result = configEditor.addEventListener(result, {
            "plugin:url-context:UPDATE" : {
                actions : [
                    assign({
                        encoded : (_, { data }) => {
                            const encoded = encode(data);

                            updateUrl(encoded);
                                    
                            return encoded;
                        },
                        decoded  : (_, { data }) => data,
                    }),
                    
                ],
            },
        });

        return result;
    },
});
