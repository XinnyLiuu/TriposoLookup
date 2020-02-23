/**
 * Refer to https://nextjs.org/docs/api-reference/next.config.js/environment-variables
 * 
 * All environment variables for this application is listed below
 */

module.exports = {
    env: {
        // The following are endpoints pointing to lambdas
        get_location_by_id_api: "https://5a3yh57fa0.execute-api.us-east-1.amazonaws.com/dev/api/location/",
        post_location_by_match_api: "https://5a3yh57fa0.execute-api.us-east-1.amazonaws.com/dev/api/location/match",
        post_comment_api: "https://5a3yh57fa0.execute-api.us-east-1.amazonaws.com/dev/api/location/comment",
        post_location_by_nearby_api: "https://5a3yh57fa0.execute-api.us-east-1.amazonaws.com/dev/api/location/nearby"
    }
}