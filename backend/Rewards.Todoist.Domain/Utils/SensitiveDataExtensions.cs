namespace Rewards.Todoist.Domain.Utils;

public static class SensitiveDataExtensions
{
    public static string HideSensitiveData(this AuthContext authContext, string data)
    {
        if (authContext.IsAuthorized)
        {
            return data;
        }

        return new string('˟', Math.Min(data.Length, 20));
    }

    public static string[] HideSensitiveData(this AuthContext authContext, string[] data)
    {
        if (authContext.IsAuthorized)
        {
            return data;
        }

        return data.Select(x => new string(x.Where(c => !char.IsDigit(c)).ToArray())).ToArray();
    }
}
