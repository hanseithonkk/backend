import { HttpException } from "@nestjs/common";

export class LocationUtil {
    constructor(
        private readonly accessKey: string,
        private readonly secretKey: string

    ) { }

    async reverseGeocode(location: string): Promise<string> {
        const response = await fetch(
            "https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?" +
            new URLSearchParams(
                {
                    coords: location,
                    output: "json",
                }
            ),
            {
                headers: {
                    'X-NCP-APIGW-API-KEY-ID': this.accessKey,
                    'X-NCP-APIGW-API-KEY': this.secretKey
                }
            }
        )

        // check status code
        if (!response.ok)
            throw new HttpException('Failed to get address', 404)

        const json = await response.json()

        if (json.status.code !== 0)
            throw new HttpException("Failed to get address", 404)

        const region = json.results[0].region
        return `${region.area2.name} ${region.area3.name}`
    }
}