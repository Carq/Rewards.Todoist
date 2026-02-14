using System.Buffers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Rewards.Todoist.Domain.Todoist.Contract;

public class LargeNumberToStringConverter : JsonConverter<string>
{
    public override string? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        switch (reader.TokenType)
        {
            case JsonTokenType.Number:
                // Read the number as a string by getting the UTF8 bytes
                if (reader.HasValueSequence)
                {
                    var sequence = reader.ValueSequence;
                    return Encoding.UTF8.GetString(sequence);
                }
                else
                {
                    var span = reader.ValueSpan;
                    return Encoding.UTF8.GetString(span);
                }
                
            case JsonTokenType.String:
                return reader.GetString();
                
            case JsonTokenType.Null:
                return null;
                
            default:
                throw new JsonException($"Unexpected token type: {reader.TokenType}");
        }
    }

    public override void Write(Utf8JsonWriter writer, string? value, JsonSerializerOptions options)
    {
        if (value == null)
        {
            writer.WriteNullValue();
        }
        else
        {
            writer.WriteStringValue(value);
        }
    }
}
