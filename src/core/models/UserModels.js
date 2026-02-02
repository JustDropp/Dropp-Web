/**
 * User Models
 */

// User Profile Model
export class UserProfile {
    constructor(data) {
        this._id = data._id;
        this.fullName = data.fullName;
        this.username = data.username;
        this.email = data.email;
        this.dob = data.dob;
        this.bio = data.bio;
        this.phone = data.phone;
        this.followers = data.followers;
        this.following = data.following;
        this.profileImageUrl = data.profileImageUrl;
        this.role = data.role;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    static fromJSON(json) {
        return new UserProfile(json);
    }
}
