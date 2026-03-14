from dataclasses import dataclass


@dataclass
class AudioUploadResult:
    file_key: str
    public_url: str
    mime_type: str
    size_bytes: int
    duration_seconds: float | None = None


class AudioStorageService:
    """
    Abstraction for audio file storage.

    Later you can plug different implementations (local FS, Cloudflare R2, etc).
    """

    def upload(self, file) -> AudioUploadResult:  # type: ignore[override]
        """
        Upload a file-like object and return its metadata.

        TODO: Implement this method when integrating real storage.
        """
        raise NotImplementedError


class CloudflareR2AudioStorageService(AudioStorageService):
    """
    Placeholder for Cloudflare R2 audio storage implementation.

    TODO:
    - Use R2 credentials from environment (.env)
    - Upload file to R2
    - Return AudioUploadResult with correct file_key and public_url
    """

    def upload(self, file) -> AudioUploadResult:  # type: ignore[override]
        # TODO: implement real R2 upload logic
        raise NotImplementedError("Cloudflare R2 upload is not implemented yet.")